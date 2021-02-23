class typeText {
    constructor(element, toRotate, period) {
        this.element = element;
        this.toRotate = toRotate;
        this.period = period;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.text = "";
        this.tick();
        this.isDeleting = false;
    }
    tick() {
        var i = this.loopNum % this.toRotate.length;
        var fullText = this.toRotate;

        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }

        this.element.innerHTML = '<span class="wrap">' + this.text + '</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.text == fullText) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text == "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    }
}


window.onload = function() {
    var elements = document.getElementsByClassName("typewrite");
    for(var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute("data-type");
        var period = elements[i].getAttribute("data-period");
        if(toRotate) {
            new typeText(elements[i], JSON.parse(JSON.stringify(toRotate)), period);
        }
    }

    var css = document.createElement("style");
    css.typeof = "text/css";
    css.innerHTML = ".typewrite > .wrap {font-size: 55px; font-family: 'Roboto', sans-serif; text-transform: uppercase; border-right: 0.01em solid #000000;}";
    document.body.appendChild(css); 
}; 