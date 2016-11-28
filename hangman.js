var arr = ["Hallo", "Orthodox", "IMD", "Algorithmus", "Kiosk", "Bus", "Brot", "Mittelalter", "Avocado", "Zuchini", "Fußball", "Arroganz", "Kreativ", "Laptop", "Schwimmbad", "Kellerassel", "Arsen", "Loki", "Gargamel", "Endzustand", "Array", "Codierung"];
//Wörterdatenbank kann beliebig erweitert werden

//anzahl der richtingen Buchstaben (schlechter Name)
var winCount = 0;
//lösung & erstes Rätsel wird zufällig aus der Liste rausgeholt
var solution;
solution = arr[floor(random(0, arr.length - 1))];
//variabeln welche später verwendet werden 
var lineGröße;
var buchstaben;
//weil ich zu dumm zum planen bin
var setupX = -80;
var setupY = -30;
//anzahl der Fehler für den Switch später
var mistakes = 1;
//liste der schon gefundenen Buchstaben
var schonGeraten = [];
//eig nur dafür gedacht das Programm später im if anzuhalten 
var running = true;
//Punktzahl
var score = 0;



//erstellt die Linien unten und einige Variabeln
var prepareWord = function() {
    schonGeraten = [];
    buchstaben = solution.length;
    lineGröße = width / buchstaben;
    //erstellung der Linien 
    for (var i = 0; i < buchstaben; i++) {
        strokeWeight(2);
        line(i * lineGröße + 10, 450, i * lineGröße + lineGröße - 10, 450);
    }
    //println(solution);    
};

//zeichnet bei jedem aufrufen den Score oben links in die Ecke
var drawScore = function() {
    noStroke();
    //fill(255, 255, 255);
    rect(0, 0, 130, 50);
    fill(0, 0, 0);
    textSize(20);
    textAlign(CENTER);
    text("score: " + score, 60, 30);
    noFill();
    stroke(0, 0, 0);
};

//Zeichnet den Hangman und verändert sich mit jedem durchlauf durch seinen eigenen Zähler
//zusammen mit mistake 8 setzt es das Canvas zurück und mit 9 hällt es das spiel entgültig an
//eig nur sehr viel gezeichne
var drawHang = function() {
    if (running) {
        switch (mistakes) {
            case 1:
                //println("standbalken");
                strokeWeight(4);
                arc(360 + setupX, 328 + setupY, 100, 100, -160, -20);
                strokeWeight(6);
                line(360 + setupX, 120 + setupY, 360 + setupX, 275 + setupY);
                break;
            case 2:
                //println("Querbalken");
                line(356 + setupX, 120 + setupY, 259 + setupX, 120 + setupY);
                line(318 + setupX, 120 + setupY, 358 + setupX, 156 + setupY);
                break;
            case 3:
                //println("Galgen");
                strokeWeight(4);
                line(259 + setupX, 120 + setupY, 259 + setupX, 152 + setupY);
                noFill();
                bezier(257 + setupX, 153 + setupY, 202 + setupX, 212 + setupY, 325 + setupX, 205 + setupY, 259 + setupX, 150 + setupY);

                break;
            case 4:
                //println("Kopf");
                strokeWeight(3);
                fill(255, 247, 194);
                ellipse(260 + setupX, 180 + setupY, 40, 40);
                strokeWeight(3);
                noFill();
                arc(258 + setupX, 201 + setupY, 30, 30, -120, -50);
                strokeWeight(2);
                ellipse(250 + setupX, 175 + setupY, 3, 3);
                ellipse(268 + setupX, 175 + setupY, 3, 3);
                break;
            case 5:
                //println("Arme");
                strokeWeight(3);
                line(258 + setupX, 201 + setupY, 280 + setupX, 223 + setupY);
                line(258 + setupX, 201 + setupY, 240 + setupX, 220 + setupY);
                break;
            case 6:
                //println("Körper");
                line(258 + setupX, 201 + setupY, 258 + setupX, 231 + setupY);
                break;
            case 7:
                //println("tot");
                line(259 + setupX, 231 + setupY, 273 + setupX, 248 + setupY);
                line(258 + setupX, 231 + setupY, 244 + setupX, 248 + setupY);
                break;

            case 8:
                noStroke();
                fill(255, 255, 255);
                rect(0, 0, width, height);
                mistakes = 0;
                stroke(0, 0, 0);
                fill(0, 0, 0);
                textAlign(CENTER, CENTER);
                textSize(90);
                text("LOSER", width / 2, height / 2);
                running = false;
                break;
            case 9:
                noStroke();
                fill(255, 255, 255);
                rect(0, 0, width, height);
                mistakes = 0;
                stroke(0, 0, 0);
                score++;
                drawScore();
                //running = false;
                break;
        }
        mistakes++;

    }
};


//wird bei jedem knopfdruck aufgerufen
var draw = function() {
    var akt = popMatrix;
    
};
var keyPressed = function() {
    if (running) {
        var fehler = true;
        //macht aus key einen einfachen string in lower Case.
        var keyTest = key.toString().toLowerCase();

        //falls alles erraten wurde stopt es den funktionsdurchlauf und springt wieder nach draußen
        if (winCount === buchstaben) {
            mistakes = 9;
            drawHang();
            solution = arr[floor(random(0, arr.length - 1))];
            prepareWord();
            winCount = 0;
            return null; //--> mach einfach nix und hör hier auf
        }




        //checkt ob die eingabe schon in den geratenen Buchstaben ist
        for (var l = 0; l < schonGeraten.length; l++) {
            if (schonGeraten[l] === keyTest || schonGeraten[l] === keyTest.toLowerCase()) {
                //println("schon gedrückt");
                return null;
            }
        }


        //irgendwie redundant aber funktioniert 
        //checkt ob der Buchstabe teil des Wortes ist
        for (var j = 0; j < buchstaben; j++) {
            if (solution[j].toString() === keyTest || solution[j].toString() === keyTest.toUpperCase()) {
                fehler = false;
                //println("der BUchstabe ist dabei");

            }
        }



        //checkt ob die eingabe teil des Wortes ist,  und Zeichnet die Buchstaben
        //verwendet dabei um g/k schreibung beizubehalten den eintrag in der solution[]
        //packt die eingabe dann in die schonGeraten[] Liste
        if (!fehler) {
            for (var k = 0; k < buchstaben; k++) {
                if (solution[k].toString() === keyTest || solution[k].toString() === keyTest.toUpperCase()) {
                    fill(0, 0, 0);
                    textAlign(CENTER);
                    textSize(width / buchstaben / 2);
                    text(solution[k], lineGröße * k + lineGröße / 2, 440);
                    noFill();
                    schonGeraten.push(keyTest);
                    winCount++;

                }
            }
            //ansonsten gehts einen schritt näher an den untergang
        } else {
            drawHang();
        }

        //println(keyTest);
    }
};


var draw = function() {
    prepareWord();
};
//um alles zu initialisieren

drawScore();

prepareWord();