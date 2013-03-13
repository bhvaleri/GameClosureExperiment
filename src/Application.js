import ui.TextView as TextView;
import ui.ImageView as ImageView;
import ui.View as View;

exports = Class(GC.Application, function () {

	this.initUI = function () {
    this.style.backgroundColor = "#FFFFFF";

    
    var opts = {superview: GC.app.view, x: 0, y: 50};

    this.currentBox; 

    new BoxCreator({
      superview: GC.app.view,
      x:0,
      y:0
    }, "#FF0000");

    new BoxCreator({
      superview: GC.app.view,
      x:0,
      y:100
    }, "#00FF00");

    new BoxCreator({
      superview: GC.app.view,
      x:0,
      y:200
    }, "#0000FF");


//    this.view.on("InputMove", function (evt, pt) {
//      if (this.currentBox) {
//        this.currentBox.style.x = pt.x - 25;
//        this.currentBox.style.y = pt.y - 25;
//      };
//    });

  };

  this.launchUI = function () {};
});

var BoxCreator = Class(View, function (supr) {

  var childOpts = {x: 100, y: 100};

  this.init = function (opts, color) {
    supr(this, "init", [merge(opts, {width: 50, height: 50, backgroundColor: color})]);;


    this.on("InputSelect", function () {
      this.getSuperview().addSubview(new ColorBox(childOpts, color));
    });
  };

});
var ColorBox = Class(View, function (supr) {
  this.init = function (opts, color) {
    supr(this, "init", [merge(opts, {width: 50, height: 50})]);

    this.style.backgroundColor = color;

    this._time = 0; 
    this._add = true;
    this._focused = false;


    this.on("InputSelect", function () {
      var superView = this.getSuperview();
      if (this._focused) {
        this.blur();
        this._focused = false;
      }
      else {
        this.focus();
        this._focused = true;
      }

      this.startDrag();

      if (superView.currentBox != this) {
        superView.currentBox = this;
      }
      else {
        superView.currentBox = null;
      }

    });

    this.onFocus = function () {
     this.tick = function (dt) {
      this._time++; 
      
      if (this._time % 4 == 0) {
        if (this._add) {
          if (this.style.height <= 100) {
            this.style.height += 10;
          }
          else {
            this._add = false;
          }
        }
        else {
          if (this.style.height >= 50) {
            this.style.height -= 10;
          }
          else {
            this._add = true;
          }
        }
      }
     };
    };

    this.onBlur = function () {
      this.tick = function (dt) { };
    }

    this.on("Drag", function (startEvent, dragEvent, delta) {
      this.style.x = dragEvent.pt['1'].x - 25;
      this.style.y = dragEvent.pt['1'].y - 25;
    });
  };
});
