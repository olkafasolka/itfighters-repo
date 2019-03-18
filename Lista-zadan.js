window.onload = function() {
  //pobranie elementów html za pomocą ID i przypisanie do zmiennych
  var titleInput = document.getElementById("titleInput");
  var descriptionInput = document.getElementById("descriptionInput");
  var addButton = document.getElementById("addButton");
  var searchPhraseButton = document.getElementById("searchPhraseButton");
  var selectAddID = document.getElementById("selectAddID");
  var selectSearchID = document.getElementById("selectSearchID");
  var indexClickedEditButton;
  // var opToDo = document.getElementById("opToDo");
  // var opInProgress = document.getElementById("opInProgress");
  // var opDone = document.getElementById("opDone");
  var tbodyID = document.getElementById("tbodyID");
  var arr = [];

  // showData(); <<< --- tu będzie wywołanie stanu początkowego, jeśli wykorzystam localStorage

  //użytkownik wpisuje dane do inputów i zaczyna się MAGIA :)
  //dodanie do buttona zdarzenia KLIK i funkcji, która pobierze dane z inputów i "włoży" je do tablicy
  addButton.addEventListener("click", clickedAddButton);

  //funkcja, która pobiera dane z inputów, przypisyuje wartości do tymczasowej zmiennej
  function clickedAddButton() {
    var newRequest = {
      title: titleInput.value,
      description: descriptionInput.value,
      status: selectAddID.value
    };
    //tu będzie "wkładanie" nowego requesta do tabeli
    arr.push(newRequest);
    showData(arr);
    document.getElementById("titleInput").value = "";
    document.getElementById("descriptionInput").value = "";
  }
  // funkcja showData będzie tworzyć w pętli 1) wiersze, 2) komórki, 3) buttony: edycja, usuwanie, 4) dodanie input type="radio" do wiersza statusy
  function showData(arr) {
    //czyszczenie tablicy po każdym przejściu pętli
    tbodyID.innerHTML = "";
    //tworzymy pętle, która będzie "przechodzić" i tworzyć to, co opisałam powyżej
    for (var i = 0; i < arr.length; i++) {
      //tworzymy wiersz
      var nextRow = document.createElement("tr");
      //tworzymy zmienne dla stworzenia komórek dla buttonów edit i remove
      var createTdToEditButton = document.createElement("td");
      var createTdToRemoveButton = document.createElement("td");
      //tworzymy zmienne, do których przypisujemy stworzenie buttonów
      var createEditButton = document.createElement("button");
      var createRemoveButton = document.createElement("button");
      //wykorzystujemy funkcje >creatTd< do stworzenia nowej komórki, która pobiera wartość z tablicy i dodaje ją do
      creatTd(arr[i].title, nextRow);
      creatTd(arr[i].description, nextRow);
      creatTd(arr[i].status, nextRow);
      createTdToEditButton.appendChild(createEditButton);
      createTdToRemoveButton.appendChild(createRemoveButton);
      //zagnieżdżanie w wierszach
      nextRow.appendChild(createTdToEditButton);
      nextRow.appendChild(createTdToRemoveButton);
      //dodawanie nazwy buttonów
      createEditButton.innerText = "Edytuj";
      createEditButton.setAttribute = ("data-index-clicked-edit-button", i);
      createRemoveButton.innerText = "Usuń";
      createRemoveButton.setAttribute = ("data-index-clicked-remove-button", i);
      //dodawanie klas do buttonów (bootstrap)
      createEditButton.className = "btn btn-outline-info";
      createRemoveButton.className = "btn btn-outline-danger";
      //ustawianie atrybutów dla buttonów i inputa
      //tu będzie dodawanie nazwy inputu
      //zagnieżdżenie wierszy w tbody
      tbodyID.appendChild(nextRow);
    }
  }
  // funckja, która tworzy nowy komórkę
  function creatTd(value, row) {
    var cell = document.createElement("td");
    cell.innerText = value;
    row.appendChild(cell);
    return cell;
  }
  // tworzymy funkcję dla buttona EDIT: na te funkcję będą się składać 4 mniejsze funkcje:
  // 1) potrzebujemy informacji, który button został kliknięty
  // 2) potrzebujemy indeksu miejsca, w których będa edytowane dane
  // 3) wyświetlamy dane z klikniętego edita w polach edycji, czyli inputach
  // 4) użytkownik edytuje dane, klika DODAJ - trzeba usunąć addEvent i dodac nowego addEvent a poza pętlą znów doda, addEvent z showData

  function clickedEdit(e) {
    //dzięki nadaniu buttonowi atrybutu o konkretnej wartości możemy teraz go przywołać za pomoca funkcji event.target,
    //to informuje nas, który rekordd kliknął użytkownik
    indexClickedEditButton = e.target.getAttribute(
      "data-index-clicked-edit-button"
    );
    //do nowej zmiennej przypisujemy za pomocą funkcji tablicę z pobranego indeksu
    var editedValueInputs = getRequestDetails(indexClickedEditButton);
    fillInputEdited(editedValueInputs);
  }
  // pobiera tablice z indexu wskazanego w funkcji clickedEdit
  function getRequestDetails(index) {
    return arr[index];
  }
  function fillInputEdited(task) {
    titleInput.value = task.title;
    descriptionInput.value = task.description;
    selectSearchID.value = task.status;
  }

  function clickedEditConfirm() {
    //dane które zostały zmieione przypisujemy do do zmiennej
    var editedTask = {
      title: titleInput.value,
      description: descriptionInput.value,
      select: selectSearchID.value
    };
    //przypisujemy obiekt do miejsca w tablicy, które zostało klikniętę (miejsce pobrano w funkcji clickedEdit)
    arr[indexClickedEditButton] = editedTask;
    showData(arr);
  }
  //dodanie klas do buttonów i selecta w html, które nie są tworzene w pętli
  addButton.className = "btn btn-outline-warning btn-sm";
  searchPhraseButton.className = "btn btn-outline-warning btn-sm";
  selectAddID.className = "form-control form-control-sm col-md-1";
  selectSearchID.className = "form-control form-control-sm col-md-1";
};
