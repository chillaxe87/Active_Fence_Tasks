const floor = new Array(5);
const messUp = () => {
    for (x = 0; x < 5; x++) {
        const yAxis = new Array(5)
        let raw = ''
        for (y = 0; y < 5; y++) {
            yAxis[y] = Math.random() > 0.4 ? false : true;
            raw += yAxis[y] ? " x " : "   ";
        }
        floor[x] = yAxis;
        console.log(raw);
    }
}

const stainsCount = () => {
    let stainCount = 0;
    let foundStains = new Set();
    xLength = floor[0].length;
    yLength = floor[1].length;



    const findStain = (x, y, newStain = true) => {
        if (x < 0 || x > xLength || y < 0 || y > yLength) return;
        if (!foundStains.has(x + "" + y) && floor[x][y] === true) {
            if (newStain) {
                stainCount += 1;
            }
            foundStains.add(x + "" + y)
            if (x < xLength - 1) findStain(x + 1, y, false)
            if (x > 0) findStain(x - 1, y, false)
            if (y < yLength - 1) findStain(x, y + 1, false)
            if (y > 0) findStain(x, y - 1, false)
        }
    }

    for (x = 0; x < xLength; x++) {
        let y = x % 2 === 0 ? 0 : yLength - 1
        for (; y < yLength && y >= 0; (x % 2 === 0 ? y++ : y--)) {
            findStain(x, y)
        }
    }
    console.log("found stains: ", stainCount);
}

messUp();
stainsCount()