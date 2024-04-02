"use client";

import { useEffect, useState } from "react";

const url = "http://127.0.0.1:3000";

export default function Home() {
  const [Pclass, setPclass] = useState<number>(0);
  const [sex, setSex] = useState<number>(3);
  const [Age, setAge] = useState<string>("");
  const [SibSp, setSibSp] = useState<string>("");
  const [Parch, setParch] = useState<string>("");
  const [Fare, setFare] = useState<string>("");

  const [result, setResult] = useState<number>();
  const [error, setError] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!Pclass || sex == 3 || !Age || !SibSp || !Parch || !Fare) {
      setFormError("Por favor, preencha todos os campos.");
      return;
    }

    setError("");
    setFormError("");
    const formData = {
      Pclass: Pclass,
      sex: sex,
      Age: Number(Age),
      SibSp: Number(SibSp),
      Parch: Number(Parch),
      Fare: Number(Fare),
    };

    postData(formData);
  };

  const postData = async (data: object) => {
    const response = await fetch(`${url}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro ao enviar a solicitação: ${response.statusText}`);
    }

    const result = await response.json();

    setResult(result[0]);
  };

  return (
    <main className="flex flex-col items-center py-20 text-black dark:text-neutral-200 dark:bg-neutral-800">
      <h2 className="font-bold text-3xl">
        Descubra se você sobreviveria ao naufrágio do Titanic
      </h2>
      <form
        className="w-full max-w-5xl mt-8 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <h4 className="font-bold text-xl">Classe:</h4>
          <label className="flex gap-2 border-b-2 border-neutral-300 py-3 cursor-pointer">
            <input
              type="radio"
              name="Pclass"
              value={1}
              onChange={(e) => setPclass(Number(e.target.value))}
            />
            <span>1º Classe</span>
          </label>
          <label className="flex gap-2 border-b-2 border-neutral-300 py-3 cursor-pointer">
            <input
              type="radio"
              name="Pclass"
              value={2}
              onChange={(e) => setPclass(Number(e.target.value))}
            />
            <span>2º Classe</span>
          </label>
          <label className="flex gap-2  py-3 cursor-pointer">
            <input
              type="radio"
              name="Pclass"
              value={3}
              onChange={(e) => setPclass(Number(e.target.value))}
            />
            <span>3º Classe</span>
          </label>
        </div>

        <div>
          <h4 className="font-bold text-xl">Sexo:</h4>
          <label className="flex gap-2 border-b-2 border-neutral-300 py-3 cursor-pointer">
            <input
              type="radio"
              name="sex"
              value={0}
              onChange={(e) => setSex(Number(e.target.value))}
              checked={sex == 0}
            />
            <span>Masculino</span>
          </label>
          <label className="flex gap-2 py-3 cursor-pointer">
            <input
              type="radio"
              name="sex"
              value={1}
              onChange={(e) => setSex(Number(e.target.value))}
              checked={sex == 1}
            />
            <span>Feminino</span>
          </label>
        </div>

        <div>
          <h4 className="font-bold text-xl">Idade</h4>
          <input
            className=" w-full p-2 outline-none border-b-2 border-neutral-300 bg-transparent"
            type="number"
            placeholder="Digite sua idade"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        <div>
          <h4 className="font-bold text-xl">
            Número de irmãos/cônjuges a bordo
          </h4>
          <input
            className=" w-full p-2 outline-none border-b-2 border-neutral-300 bg-transparent"
            type="number"
            placeholder="Digite a quantidade"
            value={SibSp}
            onChange={(e) => setSibSp(e.target.value)}
          />
        </div>

        <div>
          <h4 className="font-bold text-xl">Número de pais/filhos a bordo</h4>
          <input
            className=" w-full p-2 outline-none border-b-2 border-neutral-300 bg-transparent"
            type="number"
            placeholder="Digite a quantidade"
            value={Parch}
            onChange={(e) => setParch(e.target.value)}
          />
        </div>

        <div>
          <h4 className="font-bold text-xl">Tarifa do passageiro</h4>
          <input
            className=" w-full p-2 outline-none border-b-2 border-neutral-300 bg-transparent"
            type="number"
            placeholder="Digite a quantidade"
            value={Fare}
            onChange={(e) => setFare(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-2 rounded transition hover:bg-cyan-600 active:bg-cyan-700"
        >
          Enviar
        </button>
      </form>

      <div className="mt-6">
        {error && <p className="text-red-500">{error}</p>}
        {formError && <p className="text-red-500">{formError}</p>}

        {!error && !formError && (
          <>
            {result === 0 && (
              <p className="text-red-500">Provavelmente você morreria</p>
            )}
            {result === 1 && (
              <p className="text-green-500">Provavelmente você não morreria</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}
