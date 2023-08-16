import React, { useState, useEffect } from "react";
import axios from "axios";
import { http } from "../api/Http";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";

import TopBar from "../components/TopBar";
import Comment from "../components/Comment";
import MenuBar from "../components/MenuBar";

const CommentPage = () => {
  const location = useLocation();
  const artId = location.state.id;
  const [lists, setLists] = useState([]);
  const [newComment, setNewComment] = useState("");

  const BASE_URL = "https://yewon1209.pythonanywhere.com";

  useEffect(() => {
    getComments(artId);
  }, [artId]);

  //댓글 목록 받아오기
  const getComments = async (id) => {
    try {
      const response = await http.get(`/main/posts/${id}/comments/`);
      setLists(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(lists);

  //댓글 작성하기
  const uploadComment = async (e, id) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}/main/posts/${id}/comments/`, {
        content: newComment,
      })
      .then((response) => {
        setNewComment(response.data);
        setNewComment("");
        getComments();
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <TopBar />
      <CommentList>
        {lists &&
          lists.map((list) => (
            <Comment key={list.id} list={list} artId={artId} />
          ))}
      </CommentList>
      <WriteComment>
        <form className="input-container">
          <Input
            type="text"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
            placeholder="내용을 입력해주세요!"
          />
          <SubmitButton onSubmit={uploadComment(artId)}>등록</SubmitButton>
        </form>
      </WriteComment>
      <MenuBar />
    </Wrapper>
  );
};

export default CommentPage;

const Wrapper = styled.div`
  margin: auto;
  width: 360px;
  height: 800px;
  background: var(--n-neutral-100, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentList = styled.div`
  height: 500px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const WriteComment = styled.div`
  position: absolute;
  top: 632.6px;
  width: 328px;
  padding: 8px 16px;
  background: var(--nv-neutral-variant-95, #edf1f9);
  form {
    display: flex;
    gap: 8px;
  }
`;

const Input = styled.input`
  width: 228px;
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
  border-radius: 12px;
  border: 1.5px solid var(--s-secondary-80, #b9c8da);
  background: var(--s-secondary-99, #fcfcff);
  outline: none;
  color: var(--s-secondary-10, #0e1d2a);
  font-family: Pretendard;
  font-size: 0.88rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

const SubmitButton = styled.button`
  display: flex;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 12px;
  background: var(--p-primary-40, #00639c);
  border: none;

  color: var(--p-primary-100, #fff);
  font-family: Pretendard;
  font-size: 0.88rem;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;
