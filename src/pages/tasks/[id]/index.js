import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { useState } from "react/cjs/react.development";

const Task = ({ task, error }) => {
  // const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { push, query } = useRouter();

  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const open = () => setConfirm(true);
  // const close = () => setConfirm(false);
  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask();
    await push("/");
    close();
  };

  if (error && error.statusCode) {
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  }

  const Hero = styled.div`
    height: 90vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #202136;
  `;

  const Card = styled.div`
    width: 50%;
    padding: 1rem;
    background-color: #fff;
    border: solid 1px gray;
    text-align: center;
    border-radius: 0.3rem;
    -webkit-box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.38);
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.38);
  `;
  const CardTitle = styled.h2``;
  const CardContent = styled.p``;
  const CardDelete = styled.button`
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.3rem;
    font-size: 1rem;
    background-color: #db2828;
    margin-top: 2rem;
    cursor: pointer;
  `;

  return (
    <>
      <Hero>
        <Card>
          <div>
            <CardTitle>{task.title}</CardTitle>
          </div>
          <div>
            <CardContent>{task.description}</CardContent>
          </div>

          <div>
            <CardDelete onClick={handleDelete} loading={isDeleting}>
              Delete
            </CardDelete>
          </div>
        </Card>
      </Hero>
    </>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid ID",
      },
    },
  };
}

export default Task;
