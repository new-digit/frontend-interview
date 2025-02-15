import { useEffect, useState } from "react";

// 假設fakeFetch是一個3秒後回傳API結果的function

type List = {
  id: number;
  name: string;
};

export default function Menu() {
  const [menuList, setmenuList] = useState<List[]>([]);

  if (menuList === []) {
    return null;
  }

  useEffect(() => {
    async function fetchData() {
      const data = await fakeFetch();
      setmenuList(data);
    }
    fetchData();
  }, []);

  return (
    <div className="px-4">
      {menuList.map((item) => (
        <ul key={item.id}>
          <li className="list-disc">{item.name}</li>
        </ul>
      ))}
    </div>
  );
}

function fakeFetch(): Promise<List[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "steak",
        },
        {
          id: 2,
          name: "chicken",
        },
      ]);
    }, 3000);
  });
}

function fakeFetch2(): Promise<List[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: "steak",
        },
        {
          id: 2,
          name: "chicken",
        },
        {
          id: 3,
          name: "fish",
        },
      ]);
    }, 3000);
  });
}
