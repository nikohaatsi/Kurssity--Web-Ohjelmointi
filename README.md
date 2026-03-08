Kyseessä on (jatkokehitystä vaativa) laskuri kehitteillä olevan Deadlock videopelin buildisuunnittelua varten, sillä pelin sisällä nämä parametrit ovat hiukan piilotettuja ja vaikeasti luettavia. Tässä iteraatiossa sovelluksen/sivun ulkoasu näyttää jo ihan hyvältä, mutta funktionaalisuus vaatii vielä lisää työtä.
Laskuri käyttää fanien ylläpitämää avoimen lähdekoodin API:ta (https://deadlock-api.com/) kaiken datan hankkimiseksi. Tällä hetkellä laskuri laskee vain- ja ainoastaan ns päästatsit jokaisesta eri investointikategorioista,
mutta suunnitelmissa on tulevaisuudessa on myös laajentaa laskuri ottamaan huomioon kaikki mahdolliset esineistä saamasi statsit jotta näet buildisi antamat statsit helposti. Ideana olisi myös mahdollisesti tulevaisuudessa ottaa myös hahmon skaalaus
mukaan laskuriin, mutta tämän implementointi jäi vielä pahasti kesken.

Tärkeää laskurissa oli ottaa huomioon ns 4.8k investointipiikit, jossa yhteen kategoriaan 4800 ottelun sisäistä valuuttaa investoimalla saat suurimman suhteellisen edun. Ohjelma tarkistaakin aktiivisesti saavuttavatko valitsemasi itemit sen rajapyykin. 
Ohjelman rajoituksena on myöskin tällä hetkellä se että itemien tietojen haku vaatii tällä hetkellä tarkan kirjoitusasun, joten jätän tänne testaussyistä muutaman itemin per kategoria (lisää löytyy osoitteesta https://deadlock.wiki/Items  (sivun pohja)



Sovellus toimii syöttämällä tekstikenttän avulla itemeitä, kunnes olet tyytyväinen keräämiisi esineisiin ja haluat laskea senhetkisen valintasi lopputuloksen painamalla calculate nappia, jolloin sovellus kertoo kuinka paljon
päästatseja saat kustakin kategoriasta. Sivun pohjalta voit myös nollata laskurin, vaikkakin se toimii tällä hetkellä hiukan hassusti (WIP jne.)


Testi-itemeitä kirjaintarkka lista :

(kalleusjärjestyksessä; 800,1600,3200,6400)

Vitality(vihreät): Extra Health, Healbane, Lifestrike, Colossus


Weapon(oranssit) : Headshot Booster, Fleetfoot, Berserker, Ricochet


Spirit(violetit) : Extra Charge, Suppressor, Decay, Refresher

(osoitteesta lisää tarvittaessa https://deadlock.wiki/Items )


