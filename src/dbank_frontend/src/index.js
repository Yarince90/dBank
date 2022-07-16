import { dbank_backend } from "../../declarations/dbank_backend";

//Updates the current balance amount on page load
window.addEventListener("load", async function(){
  update();
});

//Handle amounts to add and withdraw
document.querySelector("form").addEventListener("submit", async function(event){
  event.preventDefault();
  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  //Add amount if there is a value typed in
  if (document.getElementById("input-amount").value.length != 0 ){
    await dbank_backend.topUp(inputAmount);
  }

  //Withdraw amount if there is a value typed in
  if (document.getElementById("withdrawal-amount").value.length != 0 ){
    await dbank_backend.withdraw(withdrawAmount);
  }

  await dbank_backend.compound();

  update();

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";
  button.removeAttribute("disabled");

});

async function update(){
  const currentAmount = await dbank_backend.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
}