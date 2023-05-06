const save_button = document.querySelector('.save');
const delete_button = document.querySelector('.delete');
const saveTabBtn = document.querySelector('.save-tab');

const listEl = document.querySelector('.lists');
const input = document.querySelector('.user-input');

let myLeads = [];
let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'));


// Save Tab
function saveTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem('myLeads', JSON.stringify(myLeads));
        renderLeads(myLeads);
        
    });
}

// Rendering all leads
if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    renderLeads(myLeads);
}

// Deleting all leads
function clearLocalStorage() {
    localStorage.clear();
    myLeads = [];
    renderLeads(myLeads);
}

function save_link() {

    myLeads.push(input.value);
    input.value = '';

    localStorage.setItem('myLeads', JSON.stringify(myLeads));
    //          argument
    renderLeads(myLeads);


}

//                  parameter
function renderLeads(leads) {
    let listItem = '';
    let leadsLength = leads.length;

    // Rendering the leads
    for (var i = 0; i < leadsLength; i++) {
        listItem +=
            // Template String
            `<li> 
            <a 
                target ="_blank" href="${leads[i]}">${leads[i]}
            </a> 
        </li>` + ' \n'; //or
        // const li = document.createElement('li');
        // li.textContent = myLeads[i];
        // listEl.append(li);
    }

    listEl.innerHTML = listItem;
}

save_button.addEventListener('click', save_link);
delete_button.addEventListener('click', clearLocalStorage);
saveTabBtn.addEventListener('click', saveTab);

