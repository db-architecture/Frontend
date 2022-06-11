import { useState } from "react";
import Seo from "../components/Seo";
import axios from "axios";

function Enter() {
  const [input, setInput] = useState({
    "stuff_name": "",
    "stuffcode": "",
    "first_cost": "",
    "fixed_price": "",
    "provider": "",
    "auto_order_num": ""
  })
  const [enter, setEnter] = useState([]);
  console.log(enter);
  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (input.stuff_name === "" || input.stuffcode === "" || input.first_cost === "" || input.fixed_price === "" || input.provider === "" || input.auto_order_num === "") {
      alert("모든 칸을 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      "stuff_name": "",
      "stuffcode": "",
      "first_cost": "",
      "fixed_price": "",
      "provider": "",
      "auto_order_num": ""
    })

    console.log(enter);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(enter));

    try {
      const res = await axios.post(`/stuff/newitem`, enter).then(alert("물품을 추가했습니다"));
      console.log("result: ", res.data);
      setEnter([]);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/7">
            <label className="">물품 명</label>
            <input name="stuff_name" value={input.stuff_name} onChange={onChange}
              type="text" placeholder="물품 명" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">물품 코드</label>
            <input name="stuffcode" value={input.stuffcode} onChange={onChange}
              type="text" placeholder="물품 코드" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">원가</label>
            <input name="first_cost" value={input.first_cost} onChange={onChange}
              type="text" placeholder="원가" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">정가</label>
            <input name="fixed_price" value={input.fixed_price} onChange={onChange}
              type="text" placeholder="정가" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">제조사</label>
            <input name="provider" value={input.provider} onChange={onChange}
              type="text" placeholder="제조사" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">자동발주 기준</label>
            <input name="auto_order_num" value={input.auto_order_num} onChange={onChange}
              type="text" placeholder="자동발주 기준" />
          </div>
          <div>
            <button onClick={handleClick} className="bg-sky-700 text-white rounded-md px-6 h-full">추가</button>
            <button onClick={handleSubmit} className="bg-sky-700 text-white rounded-md px-6 h-full">확인</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {enter.length}건</div>
        <table className="w-full">
          <thead align="center" className="border-y-2 border-sky-700">
            <td width="16%">금액</td>
            <td width="16%">수익 코드</td>
            <td width="16%">날짜</td>
            <td width="16%">금액</td>
            <td width="16%">수익 코드</td>
            <td width="16%">날짜</td>
          </thead>
          {enter?.map((item, index) =>
            <tbody align="center" key={index}>
              <tr>
                <td width="16%">{item.stuff_name}</td>
                <td width="16%">{item.stuffcode}</td>
                <td width="16%">{item.first_cost}</td>
                <td width="16%">{item.fixed_price}</td>
                <td width="16%">{item.provider}</td>
                <td width="16%">{item.auto_order_num}</td>
              </tr>
            </tbody>
          )}
        </table>
      </article>
    </div>
  )
}

function Check() {
  const [input, setInput] = useState({
    stuff_name: "",
    stuff_id: "",
    stuffcode: "",
  })
  const [result, setResult] = useState([]);

  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  async function handleClick(e) {
    e.preventDefault();
    setResult([]);
    console.log("input: ", input);

    try {
      const { data } = await axios.get(
        `/stuff`, JSON.stringify(input)
      );
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteStuff(e, id) {
    console.log(id);

    try {
      const res = await axios.delete(
        `/stuff/ditem`, {
        data: {
          stuff_id: id
        }
      }
      );

      alert("삭제되었습니다.");

      const { data } = await axios.get(
        `/stuff`, JSON.stringify(input)
      );
      setResult(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/3">
            <label className="">특정 품목명 선택하기</label>
            <input name="stuff_name" value={input.stuff_name} onChange={onChange}
              type="text" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col basis-1/3">
            <label className="">특정 물품id 선택하기</label>
            <input name="stuff_id" value={input.stuff_id} onChange={onChange}
              type="number" placeholder="선택사항입니다." />
          </div>
          <div className="flex flex-col basis-1/3">
            <label className="">특정 상품분류코드 선택하기</label>
            <input name="stuffcode" value={input.stuffcode} onChange={onChange}
              type="number" placeholder="선택사항입니다." />
          </div>
          <div>
            <button onClick={handleClick}
              className="bg-sky-700 text-white rounded-md px-6 h-full">조회</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {result.length}건</div>
        <table className="w-full">
          <thead align="" className="border-y-2 border-sky-700">
            <tr>
              <td width="7%">물품id</td>
              <td width="9%">물품명</td>
              <td width="8%">상품분류코드</td>
              <td width="9%">원가</td>
              <td width="9%">정가</td>
              <td width="9%">제조사</td>
              <td width="9%">유통기한</td>
              <td width="9%">자동발주 실시 재고량</td>
              <td width="9%">생성일</td>
              <td width="9%">수정일</td>
              <td width="4%">test</td>
            </tr>
          </thead>
          <tbody>
            {result?.map((item, index) =>
              <tr align="left" key={index}>
                <td>{item.stuff_id}</td>
                <td>{item.stuff_name}</td>
                <td>{item.stuffcode}</td>
                <td>{numberWithCommas(item.first_cost)}</td>
                <td>{numberWithCommas(item.fixed_price)}</td>
                <td>{item.provider}</td>
                <td>{item.expire_period}</td>
                <td>{item.auto_order_num}</td>
                <td>{item.createdAt.substring(0, 10) + " " + item.createdAt.substring(11, 19)}</td>
                <td>{item.updatedAt.substring(0, 10) + " " + item.createdAt.substring(11, 19)}</td>
                <td><button onClick={(e) => deleteStuff(e, item.stuff_id)}>삭제</button></td>
              </tr>
            )}
          </tbody>
        </table>
      </article>
    </div>
  );
}

function Revise() {
  const [input, setInput] = useState({
    "stuff_id": "",
    "auto_order_num": "",
    "stuffcode": "",
    "fixed_price": "",
  })
  const [enter, setEnter] = useState([]);
  console.log(enter);
  const onChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    })
  };

  const handleClick = (event) => {
    event.preventDefault();
    if (input.stuff_id === "" || input.auto_order_num === "" || input.stuffcode === "" || input.fixed_price === "") {
      alert("모든 칸을 입력해주세요.");
      return;
    }
    setEnter([...enter, input]);
    setInput({
      "stuff_id": "",
      "auto_order_num": "",
      "stuffcode": "",
      "fixed_price": "",
    })

    console.log(enter);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(JSON.stringify(enter));

    try {
      const res = await axios.put(`/stuff/uitem`, enter).then(alert("물품정보를 업데이트했습니다"));
      console.log("result: ", res.data);
      setResult(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <article className="border-2 rounded-md">
        <form className="flex flex-row justify-between">
          <div className="flex flex-col basis-1/7">
            <label className="">물품id</label>
            <input name="stuff_id" value={input.stuff_id} onChange={onChange}
              type="text" placeholder="물품id" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">자동발주 기준</label>
            <input name="auto_order_num" value={input.auto_order_num} onChange={onChange}
              type="text" placeholder="자동발주 기준" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">원가</label>
            <input name="stuffcode" value={input.stuffcode} onChange={onChange}
              type="text" placeholder="원가" />
          </div>
          <div className="flex flex-col basis-1/7">
            <label className="">정가</label>
            <input name="fixed_price" value={input.fixed_price} onChange={onChange}
              type="text" placeholder="정가" />
          </div>
          <div>
            <button onClick={handleClick} className="bg-sky-700 text-white rounded-md px-6 h-full">추가</button>
            <button onClick={handleSubmit} className="bg-sky-700 text-white rounded-md px-6 h-full">확인</button>
          </div>
        </form>
      </article>
      <article className="my-16 border-2">
        <div>총 {enter.length}건</div>
        <table className="w-full">
          <thead align="center" className="border-y-2 border-sky-700">
            <td width="25%">금액</td>
            <td width="25%">수익 코드</td>
            <td width="25%">날짜</td>
            <td width="25%">금액</td>
          </thead>
          {enter?.map((item, index) =>
            <tbody align="center" key={index}>
              <tr>
                <td width="25%">{item.stuff_id}</td>
                <td width="25%">{item.auto_order_num}</td>
                <td width="25%">{item.stuffcode}</td>
                <td width="25%">{item.fixed_price}</td>
              </tr>
            </tbody>
          )}
        </table>
      </article>
    </div>
  )
}

export default function Product() {
  const [type, setType] = useState("check");
  const onChange = (event) => setType(event.target.value);

  return (
    <div>
      <Seo title="물품" />
      <main className="mx-96">
        <article>
          <div className="flex flex-row justify-between my-8">
            <div className="flex-col">
              <h1 className="text-2xl font-bold">물품 관리</h1>
              <h1 className="text-xs text-gray-400">물품 조회/추가/수정/삭제가 가능합니다.</h1>
            </div>
            <div>
              <label htmlFor="type-select" className="px-4">유형: </label>
              <select value={type} onChange={onChange} id="type-select">
                <option value="check">물품 조회</option>
                <option value="enter">물품 추가</option>
                <option value="revise">물품정보 수정</option>
              </select>
            </div>
          </div>
        </article>
        {type === "check" ? <Check /> : (type === "enter" ? <Enter /> : <Revise />)}
      </main>
    </div>
  )
}