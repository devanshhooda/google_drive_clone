(function() {

    let buttonSelector = document.querySelector("#addFolderButton");
    let mainDivSelector = document.querySelector(".mainDiv");
    let mainTemplateSelector = document.querySelector("#mainTemplate");

    let folderId = 0;

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
            }
        });

        let deletButtonSelector = divFolder.querySelector("[action='delete']");
        deletButtonSelector.addEventListener("click", function() {
            let deleteConfirmed = confirm("Do you want to delete " + divFolderName.innerHTML + " folder ?");

            if (deleteConfirmed == true) {
                mainDivSelector.removeChild(divFolder);
            }
        });

        mainDivSelector.appendChild(divFolder);
    });

})();