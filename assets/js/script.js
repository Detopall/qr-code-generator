"use strict";

document.addEventListener("DOMContentLoaded", init);

function init(){
	document.querySelector("form").addEventListener("submit", generateSubmit);
}

function generateSubmit(e){
	e.preventDefault();
	const url = document.querySelector("input#url").value;
	const size = document.querySelector('select').value;
	
	if (url === ""){alert("Please enter a valid URL");return;}
	addSpinner();
	hideSpinnerAndShowQRCode(url, size);
}

function addSpinner(){
	document.querySelector("#spinner-gif").classList.remove("hidden");
}

function hideSpinnerAndShowQRCode(url, size){
	const qrcode = document.querySelector("#qrcode");
	qrcode.innerHTML = "";

	setTimeout(()=> {
		document.querySelector("#spinner-gif").classList.add("hidden");
		generateQRCode(url, size, qrcode);
		getLinkForSaveBtn(qrcode);
	}, 1500);
}

function getLinkForSaveBtn(qrcode){
	setTimeout(()=> {
		const saveUrl = qrcode.querySelector("img").src;
		createSaveBtn(saveUrl);
	}, 20);
}

function generateQRCode(url, size, qrcode){
	const createQRCode = new QRCode(qrcode, {
		text: url,
		width: size,
		height: size,
	});
}

function createSaveBtn(saveUrl) {
	const saveLink = document.querySelector("#save-link");
	if (saveLink){
		saveLink.remove();
	}
	const link = document.createElement("a");
	link.id = "save-link";
	link.classList.add("save");
	link.href = saveUrl;
	link.download = "qrcode";
	link.innerHTML = "Save Image";
	document.querySelector(".results").appendChild(link);
}
