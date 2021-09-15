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
const validateIdPattern = (id) => id.match(/^[0-9a-fA-F]{24}$/);

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
  if (typeof process === 'undefined') {
    return 'invalid 1';
  }
  if (typeof process.env === 'undefined') {
    return 'invalid 2';
  }
  if (typeof process.env.TRELLO_BOARD_ID === 'undefined') {
    return 'invalid 3';
  }
  if (!validateIdPattern(process.env.TRELLO_BOARD_ID)) {
    throw Error('Board ID is not valid.');
  }
  return process.env.TRELLO_BOARD_ID;
};
console.debug(boardId, typeof boardId);
export { validateIdPattern, validateListExistsOnBoard, boardId };
