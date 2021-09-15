import { getListsOnBoard } from './api';

/**
 * Validate Trello entity id.
 *
 * Trello ID's follow one pattern across all entities (cards, lists, boards).
 *
 * @param {string} id
 *
 * @returns boolean
 */
const validateIdPattern = (id) => {
  const matches = id.match(/^[0-9a-fA-F]{24}$/);
  return matches.length === 1 && matches[0] === id;
};

/**
 * Validate Trello list exists on board.
 *
 * @param {string} listId
 *
 * @throws if lists is not on the board.
 */
const validateListExistsOnBoard = (listId) => {
  if (!validateIdPattern(listId)) {
    throw new Error('List id is not valid (pattern): ' + listId);
  }
  const lists = getListsOnBoard(boardId());
  if (lists.indexOf(listId) === -1) {
    throw new Error('List id is not on the board: ' + listId);
  }
};

const boardId = () => {
  return (validateIdPattern(process.env.TRELLO_BOARD_ID) && process.env.TRELLO_BOARD_ID) || null;
};
console.debug('boardId', boardId);
console.debug('typeof boardId', typeof boardId);
console.debug('boardId()', boardId());
export { validateIdPattern, validateListExistsOnBoard, boardId };
