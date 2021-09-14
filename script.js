const getInput = () => {
  const issueName = document.getElementById("issue-name");
  const issuePriority = document.getElementById("issue-priority");
  const issueAssign = document.getElementById("issue-assign");
  document.getElementById("submit-click").addEventListener("click", () => {
    if (!issueName.value || !issuePriority.value || !issueAssign.value) {
      alert("Please input valid text");
      return;
    }
    generateValue(issueName.value, issuePriority.value, issueAssign.value);
    issueName.value = "";
    issuePriority.value = "";
    issueAssign.value = "";
  });
};

const generateValue = (name, priority, assign) => {
  const createId = new Date().valueOf();
  const issue = {
    name: name,
    id: createId,
    priority: priority,
    assign: assign,
    status: "Open",
    textDecor: "none",
  };
  let issueLists = [];
  const getIssues = localStorage.getItem("issues");
  if (getIssues) {
    issueLists = JSON.parse(getIssues);
  }
  issueLists.push(issue);
  const stringified = JSON.stringify(issueLists);
  localStorage.setItem("issues", stringified);
  showHtml();
};

// deleteClick: to removing items from UI and localstorage-
const deleteClick = (event, id) => {
  const lists = JSON.parse(localStorage.getItem("issues"));
  const remainingLists = lists.filter((list) => list.id !== id);
  const stringyfied = JSON.stringify(remainingLists);
  localStorage.setItem("issues", stringyfied);
  console.log(remainingLists);
  const item = event.parentNode;
  item.style.display = "none";
};

// removeClick: to remove status-
const removeClick = (id) => {
  const lists = JSON.parse(localStorage.getItem("issues"));
  const remainingLists = lists.find((elem) => elem.id === id);
  remainingLists.status = "Closed";
  remainingLists.textDecor = "line-through";
  const stringyfied = JSON.stringify(lists);
  localStorage.setItem("issues", stringyfied);
  showHtml();
};

const showHtml = () => {
  const listsStorage = localStorage.getItem("issues");
  const lists = JSON.parse(listsStorage);
  const issueField = document.getElementById("issue-field");
  issueField.innerHTML = "";
  lists.forEach((item) => {
    const { assign, id, name, priority, status, textDecor } = item;
    issueField.innerHTML += `
    <div class="card-body border p-3 rounded mt-3">
    <p class="mb-2"><small class="bg-primary text-light rounded px-2 f-w-bold">${status}</small></p>
    <p><small class="d-block">issue id: ${id}</small></p>
      <h5 class="card-title mb-2" style="text-decoration: ${textDecor}">${name}</h5>
      <p class="mb-2 fs-6"><i class="bi bi-clock"></i> ${priority}</p>
      <p><i class="bi bi-person-fill"></i> ${assign}</p>
      <button class="btn btn-warning fs-6 fw-bold text-uppercase" onclick="removeClick(${id})">Remove</button>
      <button class="btn btn-danger fs-6 fw-bold text-uppercase ms-2" onclick="deleteClick(this,${id})">Delete</button>
      </div>`;
  });
};
getInput();
showHtml();
