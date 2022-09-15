document.addEventListener("DOMContentLoaded", () => {
  //template render
  window.template();
  var selectedRow = null;
  let userId = 0;
  let productId = 0;
  let total = 0;
  const state = {
    selectedCostumerId: null,
    basketData: {},
    userData: [],
    productList: [],
  };

  // DOM
  const moneyTransfer = document.querySelector(".moneyTransfer");
  const transferSender = moneyTransfer.querySelector(
    "#from-the-account-holder-list"
  );
  const transferRecipient = moneyTransfer.querySelector(
    "#send-to-account-holder-list"
  );
  const transferAmount = moneyTransfer.querySelector("#transactional-amount");

  const userForShopList = document.querySelector("#user_for_shopping_list");
  userForShopList.addEventListener("change", (event) =>
    setState("selectedCostumerId", event.target.value)
  );

  const detail = document.querySelector("#shoppinglist-detail");

  const completeButton = document.querySelector("#completeButton");

  const sendMoneyButton = document.querySelector("#sendMoneyButton");

  // Set State
  const setState = (stateName, newState) => {
    state[stateName] = newState;
    renderApp();
  };

  //Show Alerts
  function showAlert(message, className) {
    const newNode = document.createElement("div");
    newNode.className = `alert alert-${className}`;

    newNode.appendChild(document.createTextNode(message));
    const filter = document.querySelector(".filter");

    filter.insertBefore(newNode, filter.firstChild);
  }

  //Clear All Fields
  function clearUserAddedFormFields() {
    document.querySelector("#fullName").value = "";
    document.querySelector("#balance").value = "";
  }
  //Add Data
  document.querySelector("#user-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //Get Form Values
    const fullNameElement = document.querySelector("#fullName");
    const fullName = fullNameElement.value;
    const balance = document.querySelector("#balance").value;

    //Get New User
    if (fullName != "" && balance != "") {
      const newUser = {
        id: (userId += 1),
        name: fullName,
        balance: Math.floor(balance),
        createdAt: new Date(),
      };

      //Add new user
      setState("userData", [...state.userData, { ...newUser }]);
    }

    // Clear values
    fullName.value = "";
    balance.value = "";

    //validate
    if (fullName == "" || balance == "") {
      showAlert("Please fill in all fields", "danger");
    } else {
      selectedRow = null;
      showAlert(`User ${fullName} added with balance ${balance}`, "success");

      clearUserAddedFormFields();
      fullNameElement.focus();
    }
  });

  //Delete Data
  document.querySelector(".userlist").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
      selectedRow = target.parentElement.parentElement;
      deletedUser = selectedRow.children[0].textContent;
      const deleteIndex = state.userData.findIndex(
        (user) => user.name === deletedUser
      );
      state.userData.splice(deleteIndex, 1);
      setState("userData", [...state.userData]);
      showAlert(`${deletedUser} has been deleted`, "danger");
    }
  });

  //Transfer process
  sendMoneyButton.addEventListener("click", (event) => {
    event.preventDefault();
    const userSender = transferSender.value;
    const userReceiver = transferRecipient.value;
    const amount = Number(transferAmount.value);
    const senderBalance = state.userData.find((item) => item.id == userSender);
    const receiverBalance = state.userData.find(
      (item) => item.id == userReceiver
    );

    if (userSender === userReceiver) {
      return alert("You can not choose same user");
    }
    if (senderBalance.balance < amount) {
      return alert("Insufficient balance");
    }
    if (amount == 0) {
      return alert("You can not send 0 ₺");
    }
    if (amount < 0) {
      return alert("You can not send money less than 0 ₺");
    } else {
      senderBalance.balance -= amount;
      receiverBalance.balance = Number(receiverBalance.balance) + amount;

      //Delete old datas of sender and receiver
      const senderIndex = state.userData.findIndex(
        (user) => user === senderBalance
      );
      state.userData.splice(senderIndex, 1);
      const receiverIndex = state.userData.findIndex(
        (user) => user === receiverBalance
      );
      state.userData.splice(receiverIndex, 1);

      setState("userData", [
        {
          id: senderBalance.id,
          name: senderBalance.name,
          balance: senderBalance.balance,
        },
        {
          id: receiverBalance.id,
          name: receiverBalance.name,
          balance: receiverBalance.balance,
        },
        ...state.userData,
      ]);
      showAlert(
        ` A transfer of ${amount}₺ was made from ${senderBalance.name} to ${receiverBalance.name} `,
        "success"
      );

      //Cleaning of transfer form
      transferSender.value = "";
      transferRecipient.value = "";
      transferAmount.value = "";
    }
  });

  // Create td for userlist
  function createUserTd(user) {
    return `
      <td>${user.name}</td>
      <td>${user.balance}₺</td>
      <td>
        <a href="#" class="btn btn-primary btn-sm delete">Delete</a>
      </td>
    `;
  }

  // Update user list
  function listUpdate() {
    const list = document.querySelector(".userlist");
    list.innerHTML = ``;
    state.userData.map((user) => {
      const row = document.createElement("tr");
      row.innerHTML = createUserTd(user);
      list.appendChild(row);
    });
  }

  // Create option element
  const optionCreator = (props = {}) => {
    let option = document.createElement("option");
    option.value = typeof props.id !== "undefined" ? props.id : "";
    props.selected ? option.setAttribute("selected", true) : "";
    option.textContent = `${props.name}`;

    return option;
  };

  //Update options
  const optionsUpdate = () => {
    transferSender.textContent = "";
    transferSender.appendChild(optionCreator({ name: "From", selected: true }));

    transferRecipient.textContent = "";
    transferRecipient.appendChild(
      optionCreator({ name: "To", selected: true })
    );

    userForShopList.textContent = "";
    userForShopList.appendChild(
      optionCreator({ name: "Customer", selected: true })
    );

    for (let user of state.userData) {
      transferSender.appendChild(optionCreator(user));
      transferRecipient.appendChild(optionCreator(user));
      userForShopList.appendChild(optionCreator(user));
    }

    if (state.selectedCostumerId) {
      userForShopList.value = state.selectedCostumerId;
    }
  };

  //Clear All Products Fields
  function clearProductAddedFormFields() {
    document.querySelector("#productName").value = "";
    document.querySelector("#productPrice").value = "";
    document.querySelector("#productQuantity").value = "";
  }

  //Add Product
  document.querySelector("#product-form").addEventListener("submit", (e) => {
    e.preventDefault();

    //Get Product Form Values
    const productName = document.querySelector("#productName").value;
    const productPrice = document.querySelector("#productPrice").value;
    const productQuantity = document.querySelector("#productQuantity").value;

    //Get New Product
    if (productName != "" && productPrice != "" && productQuantity != "") {
      if (productPrice <= 0) {
        return alert("Price can not equal or less than 0 ₺");
      }
      if (productQuantity <= 0) {
        return alert("Quantity can not equal or less than 0");
      } else {
        const newProduct = {
          id: (productId += 1),
          name: productName,
          price: Math.floor(productPrice),
          quantity: Math.floor(productQuantity),
        };

        //Add new product
        setState("productList", [...state.productList, { ...newProduct }]);
      }
    }

    // Clear values
    productName.value = "";
    productPrice.value = "";
    productQuantity.value = "";

    //validate
    if (productName == "" || productPrice == "" || productQuantity == "") {
      showAlert("Please fill in all fields", "danger");
    } else {
      selectedRow = null;
      showAlert(
        `New Product Added ${productName} - ${productPrice}₺ - ${productQuantity}`,
        "success"
      );
      clearProductAddedFormFields();
    }
  });

  //Add button event in product list
  function addToBasket(event) {
    event.preventDefault();
    if (!state.selectedCostumerId) {
      return;
    }
    let basketData = state.basketData;
    if (!basketData[state.selectedCostumerId]) {
      basketData[state.selectedCostumerId] = [];
    }
    basketData[state.selectedCostumerId].push(
      event.target.getAttribute("productId")
    );
    setState("basketData", basketData);
    const userSelectedValue = userForShopList.value;
    const userSelected = state.userData.find(
      (item) => item.id == userSelectedValue
    );
    showAlert(
      `${userSelected.name} added a product to the shopping cart`,
      "success"
    );
  }

  // Update product list
  function productListUpdate() {
    const productlist = document.querySelector(".productsList");
    productlist.innerHTML = ``;
    state.productList.map((product, index) => {
      const li = document.createElement("row");
      li.innerHTML = `
        <li class="list-group-item d-flex align-items-start">
           <div class="ms-2 me-auto"><div style="font-size:13px;">${product.name}</div>${product.price}₺</div>
          <span class="badge bg-success rounded-pill" style="font-size:15px; font-weight: 300;">${product.quantity}</span>
         &nbsp;
         <form id="add-product-form-${index}" productId="${product.id}">
            <button class="btn btn-primary" style="font-size:15px; font-weight: 300;" type="submit">ADD</button>
         </form>
         </li>
      `;
      productlist.appendChild(li);

      document
        .querySelector(`#add-product-form-${index}`)
        .addEventListener("submit", addToBasket);
    });
  }

  //Update function basket list
  function basketListUpdate() {
    detail.innerHTML = ``;
    let selectedCostumerId = state.selectedCostumerId;
    let basketData = state.basketData[selectedCostumerId];
    if (basketData && basketData.length) {
      completeButton.removeAttribute("disabled");
      total = 0;
      basketData.forEach((productId, index) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "align-items-start");
        let product = state.productList.find(
          (product) => product.id == productId
        );
        li.innerHTML = `        
         <div class="ms-2 me-auto"><div style="font-size:13px;">${product.name}</div>${product.price}₺</div> 
         <form id="delete-basket-${index}"  deletedId="${product.id}" index="${index}">      
         <button class="btn btn-primary" style="font-size:15px; font-weight: 300;" type="submit">DELETE</button>  
         </form>           
   `;
        detail.appendChild(li);
        total += product.price;

        document
          .querySelector(`#delete-basket-${index}`)
          .addEventListener("submit", deleteFromBasket);
      });
      completeButton.innerHTML = `Complete ${total}₺`;
    } else {
      completeButton.disabled = true;
      completeButton.innerHTML = `Complete`;
    }
  }

  //Delete button event in basket
  function deleteFromBasket(event) {
    event.preventDefault();
    if (!state.selectedCostumerId) {
      return;
    }
    let basketData = state.basketData;
    if (!basketData[state.selectedCostumerId]) {
      basketData[state.selectedCostumerId] = [];
    }
    var deletedIndex = event.target.getAttribute("index");
    basketData[state.selectedCostumerId].splice(deletedIndex, 1);
    setState("basketData", basketData);
  }

  //Purchase process
  document
    .querySelector("#shopping-form")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const userSelectedValue = userForShopList.value;
      const userSelected = state.userData.find(
        (item) => item.id == userSelectedValue
      );
      const userIndex = state.userData.findIndex(
        (user) => user === userSelected
      );
      state.userData.splice(userIndex, 1);
      setState("userData", [
        {
          id: userSelected.id,
          name: userSelected.name,
          balance: userSelected.balance - total,
        },
        ...state.userData,
      ]);

      showAlert(
        ` ${userSelected.name} made a purchase of ${total}₺`,
        "success"
      );

      //Cleaning of shopping form
      userForShopList.value = "";
      completeButton.innerHTML = `Complete`;
      detail.innerHTML = ``;
    });

  const renderApp = () => {
    listUpdate();
    optionsUpdate();
    productListUpdate();
    basketListUpdate();
  };
});
