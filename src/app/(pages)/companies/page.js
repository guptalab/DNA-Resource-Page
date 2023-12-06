"use client";
import Header from "@/components/Header";
import Card from "@/components/Company_card";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);

  const getCompanies = async () => {
    const response = await fetch("/api/companies");
    const FinalData = await response.json();
    setCompanies(FinalData);
  };

  useEffect(() => {
    getCompanies();
  });

  return (
    <>
      {companies.length === 0 && <CircularProgress />}
      <div
        style={{
          margin: "50px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {companies.map((company, index) => {
          return <Card key={index} company={company} category={'Company'} />;
        })}
      </div>
    </>
  );
};

export default CompaniesPage;
