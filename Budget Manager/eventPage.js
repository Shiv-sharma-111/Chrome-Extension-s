var contextMenuItem = {
  "id": "spendMoney",
  "title": "SpendMoney",
  "contexts": ["selection"]
};

function isInt(value) {
  return isNaN(value) && parseInt(Number(value))==value && !isNaN(parseInt(value,10));
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickdata){
  if(clickdata.menuItemId == "spendMoney" && clickData.selectionText)
  {
    if(isInt(clickData.selectionText))
    {
      chrome.storage.sync.get(['total','limit'], function(budget){
        var newTotal = 0;
        if(budget.total)
        {
          newTotal +=parseInt(budget.total);
        }
        newTotal +=parseInt(clickData.selectionText);
        chrome.storage.sync.set({'total':newTotal},function(){
          if(amount && newTotal>=budget.limit){
            var notifoptions = {
              type:'basic',
              iconUrl:'chrome48.png',
              title: 'Limit Reached!',
              message:"Uh oh!Looks like your limit is over"
            };
            chrome.notifications.create('limitNotif', notifoptions);
          }
        });
      });
    }
  }
});
