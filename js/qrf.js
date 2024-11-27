let sections = document.querySelectorAll(".main > div");
let sidebar =  document.querySelector(".sidebar");
let header = document.querySelector(".header");

let searchInput = document.querySelector(".search > input");

let allItems = document.querySelectorAll(".items")

//!!!!!!!!!!!!!!!!!!IF ADAPTED CHANGE THESE VARS!!!!!!!!!!!!!!!

const linkRoot = document.querySelector("#itemsURLRoot").innerText;

//-------------------------------------------------------------

// when slash is pressed, focus on search

document.addEventListener("keydown", (ev) => {
    if(document.activeElement !== searchInput){
        searchInput.focus();
        ev.preventDefault();
        ev.stopPropagation();
    }
})

// build sidebar

for(let section of sections){
    let sidebarSelection = document.createElement("a");

    // create link to section by first giving the section a unique id
    section.id = getSectionName(section);
    sidebarSelection.href = `#${section.id }`;
    sidebarSelection.innerText = getSectionName(section);

    // append to sidebar

    sidebar.appendChild(sidebarSelection)

}


// set up search bar

searchInput.addEventListener("input", () => {
    let value = searchInput.value.toUpperCase();

    // search through sections and display: none anything that does not 
    // match our search value
    
    for(let section of sections){
        let items = section.querySelectorAll(".item");
        let sectionIncludesMatch = false;

        // iterate through items of section
        for(let item of items){
            if(getItemName(item).toUpperCase().includes(value)){
                sectionIncludesMatch = true;
                item.style.display = ""; // resets display value
            }else{
                item.style.display = "none";
            }
        }

        // if the section does not include a match, hide it

        if(sectionIncludesMatch){
            section.style.display = "";
        }else{
            section.style.display = "none";
        }
    }

})

// build the links

for(let section of sections){
    let items = section.querySelectorAll(".item");

    // iterate through items of section
    for(let item of items){
        let itemNameElement = item.querySelector("h3");
        let itemName = item.querySelector("h3").innerText.toLowerCase();

        itemNameElement.addEventListener("click", () => {

            window.open(formLink(section, item), '_blank').focus();
        });

    }

}



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
    let name = formLinkName(section, item);
    return linkRoot + name + ".html"
}