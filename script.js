const experience = [["CEGID", "Oct 2023 - now", "IT Apprentice", "I’m working on various analysis topics at user level. And I’m helping to develop new functionalities and modernize."],
                    ["SDIS 26", "May 2021 - July 2021", "IT intern", "test"],
                    ["E.Leclerc", "May 2021 - September 2022", "Student Job", "Aside my studies, I worked at E.Leclerc"],
                    ["Amblard", "July 2017 - JULY 2022", "Summer Job", "Aside my studies, I worked as seasonnal"]]

var companyButtons = document.querySelectorAll('.company');
var companyName = document.getElementById('company');
var role = document.getElementById('role');
var date = document.getElementById('date');
var descriptif = document.getElementById('descriptif');

function loadData(index) {
    companyName.innerHTML = experience[index][0];   
    role.innerHTML = experience[index][2];   
    date.innerHTML = experience[index][1];   
    descriptif.innerHTML = experience[index][3];   
}

var activeCompanyButton = companyButtons[0];
companyButtons.forEach(companyButton => {
    companyButton.addEventListener('click', function() {
       activeCompanyButton.classList.remove('active');
        companyButton.classList.add('active');
        loadData(Array.from(companyButtons).indexOf(companyButton));
        activeCompanyButton = companyButton;
    })
});

