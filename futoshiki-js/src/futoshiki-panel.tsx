import React, { FormEvent, useState } from "react";

import { Futoshiki } from "./Futoshiki";
import { FutoshikiPrinter } from "./FutoshikiPrinter";
import { Solver } from "./Solver";
import { Board } from "./react-board";

export const FutoshikiPanel = () => {
  const [currentBoard, setCurrentBoard] = useState(() => new Futoshiki(5));
  const [boardHistory, setBoardHistory] = useState<Futoshiki[]>([]);
  const [editorContents, setEditorContents] = useState<string | undefined>(
    undefined
  );
  const [solution, setSolution] = useState<Futoshiki | undefined>(undefined);

  function handleUndo() {
    if (boardHistory.length) {
      const last = boardHistory.length - 1;
      const previousBoard = boardHistory[last];

      setBoardHistory(boardHistory.slice(0, last));
      setCurrentBoard(previousBoard);
    }
  }

  function handleSizeChange(event: FormEvent<HTMLSelectElement>) {
    setBoard(new Futoshiki(Number(event.currentTarget.value)));
  }

  function handleClearBoard() {
    setBoard(new Futoshiki(currentBoard.getLength()));
  }

  function handleShowEditor() {
    setEditorContents(FutoshikiPrinter.toString(currentBoard));
  }

  function handleEditorOkay() {
    if (editorContents !== undefined) {
      setBoard(FutoshikiPrinter.parse(editorContents));
    }
    setEditorContents(undefined);
  }

  function handleCloseEditor() {
    setEditorContents(undefined);
  }

  function handleSolve() {
    var solutionFound = false;

    new Solver({
      remainingPossibilities: (x) => {
        return true;
      },
      solution: (f) => {
        if (solutionFound) {
          window.alert("There are multiple solutions.");
          return false;
        } else {
          setSolution(f);
          solutionFound = true;

          return true;
        }
      },
    }).solve(currentBoard);
    if (!solutionFound) {
      window.alert("There are no solutions.");
    }
  }

  function setBoard(board: Futoshiki) {
    setBoardHistory(boardHistory.slice(-9).concat(currentBoard));
    setCurrentBoard(board);
    setSolution(undefined);
  }

  return (
    <div className="futoshiki-panel">
      <div className="futoshiki-editor" hidden={editorContents == undefined}>
        <textarea
          cols={20}
          rows={20}
          className="futoshiki-editor-textarea"
          value={editorContents}
          onChange={(e) => setEditorContents(e.target.value)}
        ></textarea>
        <p className="futoshiki-editor-button-panel">
          <button onClick={handleEditorOkay}>Okay</button>
          <button onClick={handleCloseEditor}>Cancel</button>
        </p>
      </div>

      <div className="futoshiki-board">
        <Board board={currentBoard} setBoard={setBoard} solution={solution} />
      </div>
      <div>
        <div className="futoshiki-status-panel">
          <h3>Current state</h3>
          {currentBoard.isValid() ? (
            <p>Valid</p>
          ) : (
            <p className="invalid">Invalid</p>
          )}

          <table>
            <tr>
              <td>
                <button onClick={handleSolve}>Solve</button>
              </td>
              <td>
                <button
                  disabled={boardHistory.length == 0}
                  onClick={handleUndo}
                >
                  Undo
                </button>
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={handleClearBoard}>Clear</button>
              </td>
              <td>
                <button onClick={handleShowEditor}>Edit...</button>
              </td>
            </tr>
          </table>

          <form>
            <select
              value={currentBoard.getLength()}
              onChange={handleSizeChange}
            >
              <option value="1">1x1</option>
              <option value="2">2x2</option>
              <option value="3">3x3</option>
              <option value="4">4x4</option>
              <option value="5">5x5</option>
              <option value="6">6x6</option>
              <option value="7">7x7</option>
              <option value="8">8x8</option>
              <option value="9">9x9</option>
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};
