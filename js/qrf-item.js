let sidebar =  document.querySelector(".sidebar");
let header = document.querySelector(".header");

let homeLink = document.querySelector(".home-link > a");

let mainTitle = document.querySelector(".main > h1")

let linkRoot = null;

const namePrefix = document.title;

const splitHref = window.location.href.split("/");
const lastPartHref = splitHref[splitHref.length - 1];
const [sectionName, itemName] = lastPartHref.split(".")[0].split("-").map(el => el.replaceAll("_", " "));

document.title = namePrefix + " - " + itemName;

header.querySelector(".title").innerText = namePrefix + ": " + sectionName + " -> " + itemName;

// make home link:

homeLink.href = `../${namePrefix}-qrf.html`;

// form main title
mainTitle.innerText = itemName;

// now grab other in section so we can link to them!

fetch(`../${namePrefix}-qrf.html`, {method: "GET"}).then(response => response.text()).then(
    html => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, "text/html");

        linkRoot = doc.querySelector("#itemsURLRoot").innerText;

        let sections = doc.querySelectorAll(".main > div");

        for(let section of sections){
            if(getSectionName(section).toUpperCase() === sectionName.toUpperCase()){
                let items = section.querySelectorAll(".item");

                for(let item of items){
                    let link = document.createElement("a");
                    link.href = formLink(section, item);
                    link.innerText = getItemName(item);
                    sidebar.appendChild(link);
                }
            }
        }

    }
).catch((error) => console.warn("Unable to load root qrf doc: " + error))


function getSectionName(section){
    return section.querySelector("h1").innerText;
}

function getItemName(item){
    return item.querySelector("h3").innerText;
}

function formLinkName(section, item){
    return getSectionName(section).replaceAll(" ", "_") + "-" + getItemName(item).replaceAll(" ", "_");
 }
 
 
 function formLink(section, item){

    if(!linkRoot){
        console.warn("linkRoot is null!!")
    }

     let name = formLinkName(section, item);
     return linkRoot + name + ".html"
 }