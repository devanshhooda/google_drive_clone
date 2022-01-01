(function () {

    let buttonSelector = document.querySelector("#addFolderButton");
    let mainDivSelector = document.querySelector(".mainDiv");
    let mainTemplateSelector = document.querySelector("#mainTemplate");

    let folderId = 0;

    buttonSelector.addEventListener("click", function () {
        let folderName = prompt("Enter the folder name");
        if (folderName == null) {
            return;
        }

        let divFolderTemplate = mainTemplateSelector.content.querySelector("[purpose='name']");
        let divFolder = document.importNode(divFolderTemplate, true);

        divFolder.setAttribute("folderId", ++folderId);

        // let deletButtonSelector = divFolder.querySelector("span[action='delete']")
        // deletButtonSelector.addEventListener("click", function () {
        //     let deleteConfirmed = confirm("Do you want to delete " + folderName + " folder ?");

        //     if(deleteConfirmed == true) {
        //         mainDivSelector.removeChild(divFolder);
        //     }

        // });

        divFolder.innerHTML = folderName;
        mainDivSelector.appendChild(divFolder);
    });

})();