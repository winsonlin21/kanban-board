// src/lib/queries.ts
import { gql } from '@apollo/client';

export const GET_BOARDS = gql`
  query GetBoards {
    boards {
      id
      name
      description
      created_at
      updated_at
    }
  }
`;

export const GET_BOARD_WITH_COLUMNS_AND_CARDS = gql`
  query GetBoardWithColumnsAndCards($boardId: uuid!) {
    boards_by_pk(id: $boardId) {
      id
      name
      description
      created_at
      updated_at
      columns(order_by: { position: asc }) {
        id
        name
        position
        cards(order_by: { position: asc }) {
          id
          title
          description
          position
          created_at
        }
      }
    }
  }
`;

export const INSERT_BOARD = gql`
  mutation InsertBoard($name: String!, $description: String) {
    insert_boards_one(object: { name: $name, description: $description }) {
      id
      name
      description
      created_at
    }
  }
`;

export const INSERT_COLUMN = gql`
  mutation InsertColumn($name: String!, $boardId: uuid!, $position: Int!) {
    insert_columns_one(object: { name: $name, board_id: $boardId, position: $position }) {
      id
      name
      position
    }
  }
`;

export const INSERT_CARD = gql`
  mutation InsertCard($title: String!, $description: String, $columnId: uuid!, $position: Int!) {
    insert_cards_one(object: { title: $title, description: $description, column_id: $columnId, position: $position }) {
      id
      title
      description
      position
    }
  }
`;