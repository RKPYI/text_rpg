let xp = 0, hp = 100, maxhp = 100, coin = 50, currentWeap = 0, potCount = 0;
let currentEnemy, monHP;

const controls = document.querySelector("#controls");
const buttons = [-1, document.querySelector("#button_1"), document.querySelector("#button_2"), document.querySelector("#button_3")];

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const hpText = document.querySelector("#hpText");
const maxhpText = document.querySelector("#maxhpText");
const coinText = document.querySelector("#coinText");
const monsterStats = document.querySelector("#monsterStats");
const monsterHP = document.querySelector("#monsterHP");
const monsterName = document.querySelector("#monsterName");

const locations = [
    {
        name : "Alun-alun",
        bTexts : [-1, "Pergi ke Pasar", "Pergi ke Goa", "Lawan RAJA IBLIS"],
        bFunctions : [-1, goToPasar, goToGoa, fightIblis],
        text : "Kamu berada di Alun-alun, kamu mau pergi ke mana?"
    },

    {
        name : "Pasar",
        bTexts : [-1, "Pergi ke Toko", "Pergi ke Pandai Besi", "Kembali ke Alun-alun"],
        bFunctions : [-1, goToToko, goToPBesi, goToAlun],
        text : "Kamu berada di Pasar and kamu melihat 2 gedung dengan Papan yang tertulis \"Toko\" dan \"Pandai Besi\"."
    },

    {
        name : "Toko",
        bTexts : [-1, "Beli Life Crystal (+10 Max HP)(-10 Coins)", "Beli 50HP Potion (-20 Coins)", "Kembali ke Pasar"],
        bFunctions : [-1, buyLifeCrystal, buyPotion, goToPasar],
        text : "Kamu masuk kedalam toko dan kamu melihat banyak benda keren yang dijual, mau beli atau kembali ke Pasar."
    },

    {
        name : "Pandai Besi",
        bTexts : [-1, "Upgrade Senjata (-30 Coins)", "Downgrade Senjata (+15 Coins)", "Kembali ke Pasar"],
        bFunctions : [-1, upgradeSenjata, downgradeSenjata, goToPasar],
        text : "Kamu masuk kedalam Pandai Besi dan sepertinya kamu bisa memperkuat senjatamu disini, Serah lu mau apa dah ada pilihannya."
    },

    {
        name : "Goa",
        bTexts : [-1, "Lawan Slime", "Lawan Orc", "Kembali ke Alun-alun"],
        bFunctions : [-1, fightSlime, fightOrc, goToAlun],
        text : "Kamu masuk kedalam goa dan merasakan keberadaan monster disekitar. Pilih monster yang ingin dilawan atau Kembali ke Alun-alun."
    },

    {
        name : "Battle",
        bTexts : [-1, "Serang", "Gunakan Potion", "Larii.."],
        bFunctions : [-1, attack, usePotion, goToAlun],
        text : "Kamu sedang bertarung dan sedang diserang oleh lawanmu. Apa yang kamu mau lakukan?"
    }
]

const weapons = [
    {
        name : "Sapu",
        damage : 5,
        accuracy : 50
    },

    {
        name : "Pisau",
        damage : 10,
        accuracy : 60
    },

    {
        name : "Copper Shortsword",
        damage : 15,
        accuracy : 70
    },

    {
        name : "Long Sword",
        damage : 20,
        accuracy : 80
    },

    {
        name : "Starfury",
        damage : 25,
        accuracy : 90
    },

    {
        name : "Enchanted Sword",
        damage : 30,
        accuracy : 95
    }
]

const monsters = [
    {
        name : "Slime",
        hp : 15,
        damage : 5,
        accuracy : 50,
        coin : 10,
        xp : 1
    },

    {
        name : "Orc",
        hp : 60,
        damage : 10,
        accuracy : 75,
        coin : 40,
        xp : 3
    },

    {
        name : "Raja Iblis",
        hp : 1000000,
        damage : 40,
        accuracy : 90
    }
]

buttons[1].onclick = goToPasar;
buttons[2].onclick = goToGoa;
buttons[3].onclick = fightIblis;

function changeLoc(loc) {
    resetButton();
    buttons[1].innerText = loc.bTexts[1];
    buttons[2].innerText = loc.bTexts[2];
    buttons[3].innerText = loc.bTexts[3];

    buttons[1].onclick = loc.bFunctions[1];
    buttons[2].onclick = loc.bFunctions[2];
    buttons[3].onclick = loc.bFunctions[3];

    text.innerText = loc.text;
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function resetButton() {
    for (let i = 1 ; i < buttons.length ; i++) {
        buttons[i].style.display = "inline-block";
    }
}

function refreshStatus() {
    hpText.innerText = hp;
    monsterHP.innerText = monHP;
    xpText.innerText = xp;
    coinText.innerText = coin;
}

function retryGame() {
    xp = 0, hp = 100, maxhp = 100, coin = 50, currentWeap = 0, potCount = 0, currentEnemy = -1, monHP = -1;
    refreshStatus();
    goToAlun();
}

function goToAlun() {
    monsterStats.style.display = "none";
    changeLoc(locations[0]);
}

function goToPasar() {
    changeLoc(locations[1]);
}

function goToToko() {
    changeLoc(locations[2]);
}

function goToPBesi() {
    changeLoc(locations[3]);
    if (currentWeap == (weapons.length - 1)) buttons[1].style.display = "none";
    if (currentWeap == 0) buttons[2].style.display = "none";
}

function goToGoa() {
    changeLoc(locations[4]);
}

function goToBattle() {
    changeLoc(locations[5]);
    monHP = monsters[currentEnemy].hp;
    monsterStats.style.display = "block";

    monsterHP.innerText = monHP;
    monsterName.innerText = monsters[currentEnemy].name;
}

function buyLifeCrystal() {
    if (coin >= 10) {
        coin -= 10;
        hp += 10;
        maxhp += 10;

        coinText.innerText = coin;
        hpText.innerText = hp;
        maxhpText.innerText = maxhp;

        text.innerText = "Kamu berhasil meningkatkan HP mu ke " + hp + ". Jika tidak ada yang dibutuhkan lagi, silahkan kembali ke Pasar."

    } else {
        text.innerText = "Kamu miskin, uangmu kurang yahahaha. Lawan monster di Goa untuk mendapatkan coin lebih banyak."
    }
}

function buyPotion() {
    if (coin >= 20) {
        coin -= 20;
        potCount++;

        coinText.innerText = coin;
        text.innerText = "Kamu berhasil membeli potion. Kamu mempunyai " + potCount + " potion di inventorymu.";
    } else {
        text.innerText = "Kamu miskin, uangmu kurang yahahaha. Lawan monster di Goa untuk mendapatkan coin lebih banyak."
    }
}

function upgradeSenjata() {
    if (currentWeap == (weapons.length - 1)) {
        text.innerText = "Senjatamu sudah terlalu OP, coba lawan RAJA IBLIS kamu mungkin kuat!"
    } else if (coin >= 30) {
        coin -= 30;
        coinText.innerText = coin;
        
        currentWeap++;
        if (currentWeap == (weapons.length - 1)) {
            buttons[1].style.display = "none";
        } else {
            buttons[1].style.display = "block";
        }

        if (currentWeap == 0) {
            buttons[2].style.display = "none";
        } else {
            buttons[2].style.display = "block";
        }

        text.innerText = "Senjata berhasil di Upgrade menjadi " + weapons[currentWeap].name + " dengan " + weapons[currentWeap].damage + "attack damage! Jika tidak ada yang ingin kau lakukan, silahkan kembali."
    } else {
        text.innerText = "Kamu miskin, uangmu kurang yahahaha. Lawan monster di Goa untuk mendapatkan coin lebih banyak."
    }
}

function downgradeSenjata() {
    if (currentWeap == 0) {
        text.innerText = "Senjatamu sudah dikeadaan yang terburuk, tidak bisa lebih buruk lagi."
    }

    coin += 15;
    coinText.innerText = coin;
    currentWeap--;
    if (currentWeap == 0) {
        buttons[2].style.display = "none";
    } else {
        buttons[2].style.display = "block";
    }

    if (currentWeap == (weapons.length - 1)) {
            buttons[1].style.display = "none";
        } else {
            buttons[1].style.display = "block";
        }

    text.innerText = "Senjatamu berhasil di Downgrade menjadi " + weapons[currentWeap].name + " dengan " + weapons[currentWeap].damage + " attack damage! Jika tidak ada yang ingin kau lakukan, silahkan kembali."
}

function fightSlime() {
    currentEnemy = 0;
    goToBattle();
}

function fightOrc() {
    currentEnemy = 1;
    goToBattle();
}

function fightIblis() {
    currentEnemy = 2;
    goToBattle();
}

function attack() {
    let isHit = (randomInt(0, 100) <= monsters[currentEnemy].accuracy ? 1 : 0);

    if (isHit) {
        text.innerText = monsters[currentEnemy].name + " menyerangmu, memberikan " + monsters[currentEnemy].damage + " damage kepadamu!\n";
        hp -= monsters[currentEnemy].damage;
        if (hp <= 0) {
            refreshStatus();
            lose();
            return;
        }
    } else {
        text.innerText = "Serangan " + monsters[currentEnemy].name + " tidak mengenaimu!\n";
    }

    isHit = (randomInt(0, 100) <= weapons[currentWeap].accuracy ? 1 : 0);
    if (!isHit) {
        text.innerText += "Seranganmu miss!";
    } else {
        let isCrit = randomInt(0, 1);
        let dmg = weapons[currentWeap].damage + (isCrit * (xp + 1));

        if (isCrit) {
            text.innerText += "Kamu menyerang " + monsters[currentEnemy].name + " dengan senjata " + weapons[currentWeap].name + "mu, memberikan " + dmg + " critical damage!!\n";
        } else {
            text.innerText += "Kamu menyerang " + monsters[currentEnemy].name + " dengan senjata " + weapons[currentWeap].name + "mu, memberikan " + dmg + " damage!\n";
        }

        monHP -= dmg;
        if (monHP <= 0) killedMonster();
    }

    refreshStatus();
}

function usePotion() {
    if (potCount > 0) {
        potCount--;
        if (hp <= (maxhp - 50)) hp += 50;
        else hp = maxhp;

        if (potCount == 0) {
            text.innerText = "Kamu meminum 1 botol potion, menyembuhkanmu ke " + hp + "HP dan stok potionmu habis.\n";
        } else {
            text.innerText = "Kamu meminum 1 botol potion, menyembuhkanmu ke " + hp + "HP dan mengurangi stok potionmu ke " + potCount + ".\n";
        }

        let isHit = (randomInt(0, 100) <= monsters[currentEnemy].accuracy ? 1 : 0);
        if (isHit) {
            text.innerText += monsters[currentEnemy].name + " menyerangmu memberikan " + monsters[currentEnemy].damage + " damage kepadamu!\n";
            hp -= monsters[currentEnemy].damage;
            if (hp <= 0) {
                refreshStatus();
                lose();
                return;
            }
        } else {
            text.innerText = "Serangan " + monsters[currentEnemy].name + " tidak mengenaimu!\n";
        }
    } else {
        text.innerText = "Stok potion mu sudah habis...";
    }

    refreshStatus();
}

function lose() {
    text.innerText += "You DED...";
    buttons[2].innerText = "Coba lagi";
    buttons[2].onclick = retryGame;

    buttons[1].style.display = "none";
    buttons[3].style.display = "none";
    monsterStats.style.display = "none";
}

function killedMonster() {
    if (currentEnemy === (monsters.length - 1)) {
        text.innerText += "WOOOW!! Selamat!!! Kamu adalah Pahlawan yang Telah menyelamatkan Isekai lokal yang akan diingat oleh semua orang...";
        buttons[2].innerText = "Replay";
        buttons[2].onclick = retryGame;

        buttons[1].style.display = "none";
        buttons[3].style.display = "none";
        monsterStats.style.display = "none";
    } else {
        xp += monsters[currentEnemy].xp;
        coin += monsters[currentEnemy].coin;
        refreshStatus();

        text.innerText += ("Kamu telah membunuh " + monsters[currentEnemy].name + " dan mendapatkan "
        + monsters[currentEnemy].xp + " XP + " + monsters[currentEnemy].coin + " Coins!");
        
        buttons[2].innerText = "Kembali";
        buttons[2].onclick = goToGoa;
        
        buttons[1].style.display = "none";
        buttons[3].style.display = "none";
        monsterStats.style.display = "none";
    }
}