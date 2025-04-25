## 請依據需求與設計稿完成功能與介面

1. Fork
2. 完成功能
3. 發起PR
4. 通知人資

------

##### 設計稿

https://www.figma.com/design/3RzJHJpz4Bo4JfTQvVZu15/Frontend-Interview?node-id=0-1&m=dev&t=VtVfzRuBm4L0hXG0-1

---

##### 功能

![feature1](https://github.com/new-digit/frontend-interview/blob/main/sheet/public/feature-1.png)

1. 點選黃框處可以選擇特定交易，並可以點擊按鈕刪除
2. 點選紅框可以全選該頁所有交易，並可以點擊按鈕刪除

![feature2](https://github.com/new-digit/frontend-interview/blob/main/sheet/public/feature-2.png)

1. 可以在搜尋欄搜尋特定交易(至少支持單一欄位搜尋，例如 ID 搜尋)
2. 點擊 REFRESH 重新抓取清單，抓取時需要有 loading 狀態的 UI 呈現

![feature3](https://github.com/new-digit/frontend-interview/blob/main/sheet/public/feature-3.png)

1. 點選黃框處可以刪除單筆資料
2. 點選紅框處將 Balance 欄位的狀態互相切換

![feature4](https://github.com/new-digit/frontend-interview/blob/main/sheet/public/feature-4.png)

1. 點擊箭頭可以切換分頁，並呈現該頁相對應的資料數量

---

##### 備註

- 刪除不需要發送請求，只要改變UI即可
- 型別不能使用any
- 使用專案內的 mockFetch 完成功能
![mock-fetch](https://github.com/new-digit/frontend-interview/blob/main/sheet/public/mock-fetch.png)
