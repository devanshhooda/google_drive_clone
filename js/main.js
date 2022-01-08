(function() {

    let buttonSelector = document.querySelector("#addFolderButton");
    let mainDivSelector = document.querySelector(".mainDiv");
    let mainTemplateSelector = document.querySelector("#mainTemplate");
    let breadCrumbSelector = document.querySelector("#divBreadCrumb");

    let folderId = -1;
    let currentFolderId = -1;

    let folders = getDataFromLocalStorage();

    // folders.forEach((folder) => {

    // });

    buttonSelector.addEventListener("click", function() {
        let folderName = prompt("Enter the folder name");
        if (folderName == null) {
            return;
        }

        let divFolderTemplate = mainTemplateSelector.content.querySelector(".folderDiv");
        let divFolder = document.importNode(divFolderTemplate, true);
        let divFolderName = divFolder.querySelector("[purpose='name']");

        divFolderName.innerHTML = folderName;

        divFolder.setAttribute("folderId", ++folderId);

        let editButtonSelector = divFolder.querySelector("[action='edit']");
        editButtonSelector.addEventListener("click", function() {
            let folderNewName = prompt("Enter the new name for folder");

            if (folderNewName != null) {
                divFolderName.innerHTML = folderNewName;

                // updating in folders array
                let folder = folders.find(folder => (folder.id == parseInt(divFolder.getAttribute("folderId"))));
                folder.name = folderNewName;
                // persistDataToStorage();
            }
        });

        let deletButtonSelector = divFolder.querySelector("[action='delete']");
        deletButtonSelector.addEventListener("click", function() {
            let deleteConfirmed = confirm("Do you want to delete " + divFolderName.innerHTML + " folder ?");

            if (deleteConfirmed == true) {
                mainDivSelector.removeChild(divFolder);

                // removing from folders array
                let folderIndex = folders.findIndex(folder => (folder.id == parseInt(divFolder.getAttribute("folderId"))));
                folders.splice(folderIndex, 1);
                persistDataToStorage();
            }
        });

        mainDivSelector.appendChild(divFolder);
        folders.push({
            id: folderId,
            name: divFolderName.innerHTML
        });
        // persistDataToStorage();
    });

    function addFolderHtmltoPage(folderName, folderId) {
        let divFolderTemplate = mainTemplateSelector.content.querySelector(".folderDiv");
        let divFolder = document.importNode(divFolderTemplate, true);
        let divFolderName = divFolder.querySelector("[purpose='name']");

        divFolderName.innerHTML = folderName;

        divFolder.setAttribute("folderId", folderId);
    }

    function getDataFromLocalStorage() {
        let folders = JSON.parse(localStorage.getItem("foldersData"));
        if (folders != null) {
            if (folders.length > 0) {
                return folders;
            }
        }
        return [];
    }

    function persistDataToStorage() {
        console.log(folders);
        let foldersJSON = JSON.stringify(folders);
        localStorage.setItem("foldersData", foldersJSON);
    }

})();