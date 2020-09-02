class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: null};
  }

clicked(x) {
  this.setState({selected: x});
}

typed(e) {
  const x = this.state.selected;
  if (x) {
    const n = Number(e.key);
    if (n >= 1 && n <= this.props.f.getLength()) {
      this.props.f.set(x.column, x.row, e.key);
      this.setState({});
    }
  } else {
    window.alert("Nothing selected, but: " + e.key);
  }
}

keydown(e) {
  const x = this.state.selected;
  if (x && (e.key === "Delete" || e.key === "Backspace")) {
      this.props.f.clear(x.column, x.row);
      this.setState({});
  }
}

toggleRule(gtr) {
  const r = this.props.f.getRule(gtr);
  if (!r) {
    this.props.f.addGtRule(gtr.getGreaterColumn(), gtr.getGreaterRow(),
	    gtr.getLesserColumn(), gtr.getLesserRow());
  } else if (JSON.stringify(r) == JSON.stringify(gtr)) {
    this.props.f.addGtRule(gtr.getLesserColumn(), gtr.getLesserRow(),
	    gtr.getGreaterColumn(), gtr.getGreaterRow());
  } else {
    this.props.f.removeRule(gtr);
  }

  this.setState({});
}

render() {
  let f = this.props.f;
  let selected = this.state.selected;

    const l = f.getLength();

    let elements = [];

    for (let row = 1; row <= f.getLength(); row++) {
        for (let column = 1; column <= f.getLength(); column++) {
            let pos = new abc.CellPos(column, row);

            let cellId;
            if (selected && (selected.column === pos.column && selected.row === pos.row)) {
                cellId = '#cell_active';
            } else {
                cellId = '#cell';
            }

            elements.push(
<use href={cellId} x={10 + (column - 1) * 30} y={10 + (row - 1) * 30} key={"cell_" + row + "_" + column}/>
            );
            elements.push(
<text x={20 + (column - 1) * 30} y={20 + (row - 1) * 30} dominantBaseline="middle" textAnchor="middle" style={{'fontSize': '10px', 'fontWeight': 'bold', 'fontFamily': 'sans-serif'}} key={"cell_val_" + row + "_" + column}>{f.get(column, row) || ''}</text>
            );
            elements.push(
<rect x={10 + (column - 1) * 30} y={10 + (row - 1) * 30} width="20" height="20" fill="transparent" onClick={() => this.clicked(pos)} key={"click_cell_" + row + "_" + column}/>
	    );
	}
    }

    for (let r of f.getRules()) {
      let href;

      let x = 10 + (Math.min(r.columnA, r.columnB) - 1) * 30;
      let y = 10 + (Math.min(r.rowA, r.rowB) - 1) * 30;

      if (r.rowB > r.rowA) {
        href = '#v_gt';
        y += 20;
      } else if (r.rowB < r.rowA) {
        href = "#v_lt";
        y += 20;
      } else if (r.columnB > r.columnA) {
        href = "#h_gt";
        x += 20;
      } else {
        href = "#h_lt";
        x += 20;
      }

      elements.push(
<use href={href} x={x} y={y} key={`rule_${r.columnA},${r.rowA}_${r.columB},${r.rowB}`}/>
      );
    }


    for (let row = 1; row <= f.getLength(); row++) {
        for (let column = 1; column < f.getLength(); column++) {
            const r = new abc.GtRule(column, row, column + 1, row);

            let x = 10 + (column - 1) * 30;
            let y = 10 + (row - 1) * 30;

	    x += 20;
	    elements.push(<rect x={x} y={y} width="10" height="20" fill="red" opacity="50%" key={`toggle_rule_horiz_${column},${row}`} onClick={() => this.toggleRule(r)}/>);
	}
    }

    for (let row = 1; row < f.getLength(); row++) {
        for (let column = 1; column <= f.getLength(); column++) {
            const r = new abc.GtRule(column, row, column, row + 1);

            let x = 10 + (column - 1) * 30;
            let y = 10 + (row - 1) * 30;

	    y += 20;
	    elements.push(<rect x={x} y={y} width="20" height="10" fill="green" opacity="50%" key={`toggle_rule_vert_${column},${row}`} onClick={() => this.toggleRule(r)}/>);
	}
    }

    const units = l * 30 + 10;
    return (<svg viewBox={`0 0 ${units} ${units}`} width="530" height="530" tabIndex="0" onKeyPress={(e) => this.typed(e)} onKeyDown={(e) => this.keydown(e)}>

{/* px, py = 10 */}

<defs>
<g id='h_gt'>

<polygon points='10,37 40,47 40,53 10,63 10,57 30,50 10,43'
 transform='scale(0.2)' />
</g>

<g id='h_lt'>
<use href='#h_gt' transform='translate(10, 20) rotate(180)' />
</g>

<g id='v_gt'>
<use href='#h_gt' transform='translate(20, 0) rotate(90)' />
</g>

<g id='v_lt'>
<use href='#h_gt' transform='translate(0, 10) rotate(-90)' />
</g>

<g id='cell'>
<rect x='0' y='0' width='20' height='20' fill='white'/>

{/* Red if selected */}
<rect x='0' y='0' width='20' height='20' style={{fill: 'none', stroke: 'black', 'strokeWidth': '1px'}} />
</g>

<g id='cell_active'>
<rect x='0' y='0' width='20' height='20' fill='white'/>

{/* Red if selected */}
<rect x='0' y='0' width='20' height='20' style={{fill: 'none', stroke: 'red', 'strokeWidth': '1px'}} />
</g>
</defs>

<rect x='0' y='0' width='160' height='160' fill='lightgray'/>

{/*
 Black bold for designed
 Blue for automatic
 + Red for selected
*/}
<text x='20' y='20' dominantBaseline="middle" textAnchor="middle" style={{'fontSize': '10px', 'fontWeight': 'bold', 'fontFamily': 'sans-serif'}}>{l}</text>

{/* Second cell */}
<text x='50' y='20' dominantBaseline="middle" textAnchor="middle" style={{'fontSize': '10px', 'fontWeight': 'bold', 'fontFamily': 'sans-serif'}}>1</text>


{elements}

</svg>
    );
}
}
