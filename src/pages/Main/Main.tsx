import React, { FC, useState, useEffect, useCallback } from "react";
import { getCivilizations } from "services/ageService";
import { tw } from "twind";
import { CivilizationsList } from "./style";

const Main: FC = () => {
  const [civilizations, setCivilizations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const requestCivilizations = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await getCivilizations();
      //console.log(data);
      setCivilizations(data.civilizations);
    } catch (e) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    requestCivilizations();
  }, [requestCivilizations]);

  return (
    <div id="container-main" data-testid="container-main">
      <h1 className={tw`text-center text-5xl font-bold my-10`}>Age of React</h1>
      {civilizations.length > 0 ? (
        <CivilizationsList
          id="civilizations-list"
          data-testid="civilizations-list"
        >
          {civilizations.map((c: any) => (
            <div key={c.id}>{c.name}</div>
          ))}
        </CivilizationsList>
      ) : null}
      {error ? (
        <div className={tw`text-center`} data-testid="error">
          Error
        </div>
      ) : null}
      {isLoading ? (
        <div className={tw`text-center`} data-testid="loading">
          Loading...
        </div>
      ) : null}
    </div>
  );
};

export default Main;
