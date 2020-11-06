function hypers([...args]) {
  let string = args.join(" ");
  let topString = " \n";
  let bottomString = "\n";
  for (let i = 0; i < string.length; i++) {
    if (!/[a-zA-Z]/.test(string.charAt(i))) {
      topString += "   ";
      bottomString += "   ";
    } else {
      topString += " :regional_indicator_" + string.charAt(i) + ": ";
      bottomString += " :RGRhype: ";
    }
  }
  return topString + bottomString;
}

let $ = document.querySelector.bind(document);
function getFormValues(formEl) {
  return formEl.$$("input").map((el) => el.value);
}
HTMLElement.prototype.$$ = function (sel) {
  return [...this.querySelectorAll(sel)];
};
Node.prototype.on = function (ev, cb) {
  this.addEventListener(ev, cb);
};

let form = $("form");
let output = $("pre");
form.on("submit", (e) => {
  e.preventDefault();
  let string = hypers(getFormValues(e.target));
  output.innerText = string;
});
