//Koodin teossa käytettiin tekoälyä tukena pääasiassa tiedonhaussa, api ongelmien ratkaisussa, sekä syntaksivirheiden tarkistuksessa.
//kohdat joissa tekoälyä on käytetty on mainittu kohdan kommentissa

let adding = document.querySelector('#haku')
adding.addEventListener('click', selectitem)

let calc = document.querySelector('#calculate')
calc.addEventListener('click',calculate)

let reset= document.querySelector('#reset')
reset.addEventListener('click',resetcalc)


let cleanItems = {};


///haetaan data avoimesta apista https://deadlock-api.com/  , https://assets.deadlock-api.com/scalar#tag/items/GET/v2/items,  https://assets.deadlock-api.com/scalar#tag/items/GET/v2/items/by-slot-type/{slot_type}


AllItems().then(items => {
    cleanItems = items;
});

///haetaan raaka data avoimesta apista kategorioittain
async function gunDatafetch(){ 
    const response = await fetch('https://assets.deadlock-api.com/v2/items/by-slot-type/weapon')
    const weapondata= await response.json()
    return weapondata
}
async function spiritDatafetch(){ 
    const response = await fetch('https://assets.deadlock-api.com/v2/items/by-slot-type/spirit')
    const spiritdata= await response.json()
    return spiritdata
}

async function vitalityDatafetch(){ 
    const response = await fetch('https://assets.deadlock-api.com/v2/items/by-slot-type/vitality')
    const vitalitydata= await response.json()
    return vitalitydata
}

//kasataan kaikki relevantti tieto yhteen olioon, hain oikeat statsiparametrit(item.properties.jne linjat) jsonista tekoälyä käyttämällä
async function AllItems() {
    const weaponData = await gunDatafetch();
    const spiritData = await spiritDatafetch();
    const vitalityData = await vitalityDatafetch();
    
    let cleanItems = {};
    
    for (let item of weaponData) {
        cleanItems[item.name] = {
            name: item.name,
            cost: item.cost,
            spiritPower: Number(item.properties.TechPower?.value) || 0,
            weaponDamage: Number(item.properties.WeaponPower?.value) || 0,
            hp: Number(item.properties.BonusHealth?.value) || 0,
            category: 'Weapon'
        };
    }
    
    for (let item of spiritData) {
        cleanItems[item.name] = {
            name: item.name,
            cost: item.cost,
            spiritPower: Number(item.properties.TechPower?.value) || 0,
            weaponDamage: Number(item.properties.WeaponPower?.value) || 0,
            hp: Number(item.properties.BonusHealth?.value) || 0,
            category: 'Tech'
        };
    }
    
    for (let item of vitalityData) {
        cleanItems[item.name] = {
            name: item.name,
            cost: item.cost,
            spiritPower: Number(item.properties.TechPower?.value) || 0,
            weaponDamage: Number(item.properties.WeaponPower?.value) || 0,
            hp: Number(item.properties.BonusHealth?.value) || 0,
            category: 'Vitality'
        };
    }
    
    return cleanItems;
}
/// lisätään valitut itemit listaan koodissa sekä sivulle
let build = []

function selectitem(){
    let ul = document.querySelector('#build')
    let chosen = document.querySelector('#field').value;
    if (chosen in cleanItems === false)
        return
    let li = document.createElement('li');
    let itemname = document.createElement('span')
    itemname.textContent = chosen
    ul.appendChild(li)
    li.appendChild(itemname)
    build.push(chosen)
    document.querySelector('#field').value = ""

}


/// tekoälyllä luotu olio investointi breakpointeista, varmaan olisi ollut viisaampi tehdä api kutsulla mutta nämä muuttuvat sen verran harvoin että ei ole suuri ongelma.
//huvittavaa tässä oli se että tekoäly (google gemini) yritti antaa minulle selkeästi väärän taulun toistuvasti, joten ironisesti olisi ollut nopeampi kirjata tämä suoraan käsin.

const breakpoints = {
    souls: [800, 1600, 2400, 3200, 4800, 7200, 9600, 16000, 22400, 28800],
    
    Weapon: [7, 9, 13, 20, 49, 60, 80, 95, 115, 135], // % Weapon Damage
    Vitality: [75, 125, 200, 275, 525, 625, 750, 1000, 1200, 1400], // Health
    Tech: [7, 11, 15, 19, 38, 52, 64, 76, 89, 101] // Spirit Power
};


//funktio investointibreakpointtien laskuun

function investmentcalc(categoryinvest,categorytype){
    for (let i = breakpoints.souls.length -1 ; i >=0;i--){
        if (categoryinvest >= breakpoints.souls[i]){
            return breakpoints[categorytype][i]
    } }
    return 0;
}


//laskurit, viisaampi kaveri kuin minä olisi tehnyt yhden uudelleenkutsuttavan funktion eikä kolmea copypastea eri muuttujilla.

function totalcost (build, cleanItems){
    let totalprice= 0
    for (let name of build){
        let item = cleanItems[name];
    if (item) {
        totalprice +=item.cost}
    }
    let total = document.querySelector('#total')
    total.textContent =`Total investment:  ${totalprice}.`
}





function spiritinvest(build,cleanItems) {
    let spiritprice = 0
    let totalspirit = 0
    for (let name of build){
        let item = cleanItems[name];
        if (item.category === 'Tech') {
            spiritprice +=item.cost
            totalspirit +=item.spiritPower
            }
        }
    let spirit = document.querySelector('#spirit')
    let spiritbonus = investmentcalc(spiritprice, 'Tech')
    totalspirit +=spiritbonus
    if (spiritprice >= 4800){
        spirit.textContent = `Spirit investment: ${spiritprice}. Spirit spike reached! Spirit Power from items is ${totalspirit}`;
    }
    else{
        spirit.textContent = `Spirit investment: ${spiritprice} Spirit Power from items is ${totalspirit}`;
    }

    

}
function guninvest (build,cleanItems){
    let gunprice = 0
    let totalgun = 0
    for (let name of build){
        let item = cleanItems[name];
        if (item.category==='Weapon') {
            gunprice +=item.cost
            totalgun +=item.weaponDamage
            }
    }
    let gunbonus= investmentcalc(gunprice,'Weapon')
    totalgun += gunbonus
    let gun = document.querySelector('#gun')
    if (gunprice >= 4800){
        gun.textContent = `Gun investment: ${gunprice}. Gun spike reached! Total Weapon DMG from items is ${totalgun}`;
    }
    else{
        gun.textContent = `Gun investment: ${gunprice}. Total Weapon DMG from items is ${totalgun}`;
    }
    
}

function vitalityinvest (build,cleanItems){
    let vitalityprice = 0
    let totalvitality = 0
    for (let name of build){
        let item = cleanItems[name];
        if (item.category === 'Vitality') {
            vitalityprice +=item.cost
            totalvitality +=item.hp
            }
    }
    let vitbonus= investmentcalc(vitalityprice,'Vitality')
    totalvitality += vitbonus
    let vitality = document.querySelector('#vitality')
    if (vitalityprice >= 4800){
        vitality.textContent = `Vitality investment: ${vitalityprice}. Vitality spike reached! Total HP from items : ${totalvitality}`;
    }
    else{
        vitality.textContent = `Vitality investment: ${vitalityprice} Total HP from items : ${totalvitality}`;
    }}

//Laskurin pääfunktio
function calculate (){

    totalcost(build,cleanItems)
    spiritinvest(build,cleanItems)
    guninvest(build,cleanItems)
    vitalityinvest(build,cleanItems)
}

///nollausfunktio, toimii "hiukan" tyhmästi. korjataan soon_tm

function resetcalc(){
    let selling = document.querySelectorAll('#build li')
    selling.forEach(li => li.remove())
    build= []
    document.querySelector('#total').textContent = '';
    document.querySelector('#spirit').textContent = '';
    document.querySelector('#gun').textContent = '';
    document.querySelector('#vitality').textContent = ''
}

