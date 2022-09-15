window.template = () => {
  document.body.innerHTML = `
<div class="container mt-5">
  <div class="row">
    <div class="col-sm">
      <div class="main row justify-content-center">
        <form action="" id="user-form" class="row justify-content-left mb-4">
          <div class="d-flex justify-content-between align-items-center">
            <p style="font-weight: 500;"><strong>Add User</strong></p>
          </div>
          <div class="col-10 col-md-8 mb-3">
            <label for="fullName">Name</label>
            <input class="form-control" id="fullName" type="text" placeholder="Enter your name">
          </div>
          <div class="col-10 col-md-8 mb-3">
            <label for="balance">Balance</label>
            <input class="form-control" id="balance" type="number" placeholder="Enter the balance">
          </div>
          <div class="col-10 col-md-8 ">
            <input class="btn btn-success add-btn" type="submit" value="Submit">
          </div>
          <br>
          <br>
        </form>
        <div class="row justify-content-left  mb-4">
          <div class="d-flex justify-content-between align-items-center">
            <p style="font-weight: 500;"><strong>User List</strong></p>
          </div>
          <table class="table table-bordered table-dark">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="userlist">

            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-sm">
      <div class="main row justify-content-center moneyTransfer">
        <div class="d-flex justify-content-between align-items-center">
          <p style="font-weight: 500;"><strong>Money Transfer</strong></p>
        </div>
        <div class="row">
          <div class="col mb-1">
            <select id="from-the-account-holder-list" class="form-select" aria-label="Default select example">
              <option selected="">From</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col mb-1">
            <select id="send-to-account-holder-list" class="form-select" aria-label="Default select example">
              <option selected="">To</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col mb-1"><input type="number" class="form-control" id="transactional-amount"
              placeholder="Amount"></div>
        </div>
        <div class="row">
          <div class="col">
            <button type="button" id="sendMoneyButton" class="btn btn-success" style="width: 100%;">
              Send
              <svg width="16" height="16" fill="currentColor" class="bi bi-send mx-1" viewBox="0 0 16 16">
                <path
                  d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z">
                </path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <br>
      <br>
      <br>
      <div class="main row justify-content-center">
        <div class="history">         
          <div class="d-flex justify-content-between align-items-center">
            <p style="font-weight: 500;"><strong>History</strong></p>
          </div>
          <div class="filter">
            <div id="historyList"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm">
      <div class="d-flex justify-content-between align-items-center">
        <p style="font-weight: 500;"><strong>Basket</strong></p>
      </div>
      <div class="row">
      <div class="col mt-3">
      <form action="" id="shopping-form" class="row justify-content-right mb-4">
            <select id="user_for_shopping_list" class="form-select" aria-label="Default select example">
              <option selected="">Select a customer</option>
            </select>
            <div class="row">
              <div class="container pt-1">
                <ul class="list-group list-group-numbered" id="shoppinglist-detail">
                  <p>Select a customer to see the basket.</p>
                </ul>
              </div>
            </div>
            <div class="mt-2 d-grid">
          
              <button  type="submit" id="completeButton"  value="Complete" disabled class="btn btn-success btn-block">
              <svg width="16" height="16" fill="currentColor" class="bi bi-send mx-1" viewBox="0 0 16 16">
              <path
                d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z">
              </path>
              </button>
            </div>
         
        </form>
        </div>
      </div>

      <div class="row">
        <div class="col mt-3">
        <div class="main row justify-content-center moneyTransfer">
          <form action="" id="product-form" class="row justify-content-right mb-4">
            <div class="d-flex justify-content-between align-items-center">
              <p style="font-weight: 500;"><strong>Add Product</strong></p>
            </div>
            <div class="row">
            <div class="col mb-1">
              <input class="form-control" id="productName" type="text" placeholder="Product name">
            </div>
            <div class="col mb-1">
              <input class="form-control" id="productPrice" type="number" placeholder="Price">
            </div>
            </div>
            <div class="row">
            <div class="col mb-1">
              <input class="form-control" id="productQuantity" type="number"
                placeholder="Quantity">
            </div>
           
            <div class="col mb-1">
              <input class="btn btn-success" type="submit" value="Submit" style="width: 100%;">
            </div>
            </div>
          </form>
        </div>  
        </div>
      </div>
      <div class="row">
        <div class="col mt-3">

          <div class="d-flex justify-content-between align-items-center">
            <p style="font-weight: 500;"><strong>Product List</strong></p>
          </div>
          <ul class="list-group list-group-numbered productsList" id="productsList"></ul>
        </div>
      </div>
    </div>
  </div>
</div>
`;
};
