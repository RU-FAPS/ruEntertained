function boxFill(ctx, startC, size, color) {
    if (color) {
        ctx.fillStyle = color;
    } else {
        ctx.fillStyle = "#e6ffff";
    }
    ctx.fillRect(startC[0], startC[1], size[0], size[1]);
}

function boxStroke(ctx, startC, size, color, thickness) {
    if (color) {
        ctx.strokeStyle = color;
    } else {
        ctx.strokeStyle = "#e6ffff";
    }

    if (thickness) {
        ctx.lineWidth = thickness;
    } else {
        ctx.lineWidth = 1;
    }

    ctx.beginPath();
    ctx.moveTo(startC[0], startC[1]);
    ctx.lineTo(startC[0] + size[0], startC[1]);
    ctx.lineTo(startC[0] + size[0], startC[1] + size[1]);
    ctx.lineTo(startC[0], startC[1] + size[1]);
    ctx.lineTo(startC[0], startC[1]);
    ctx.stroke();
    ctx.closePath();
}

function boxRndStroke(ctx, centerC, size, color, thickness) {
    if (color) {
        ctx.strokeStyle = color;
    } else {
        ctx.strokeStyle = "#e6ffff";
    }

    if (thickness) {
        ctx.lineWidth = thickness;
    } else {
        ctx.lineWidth = 1;
    }

    var x = [-0.4, 0.4, 0.45, 0.5, 0.45, 0.4, -0.4, -0.45, -0.5, -0.45, -0.4];
    var y = [-0.5, -0.5, -0.35, 0, 0.35, 0.5, 0.5, 0.35, 0, -0.35, -0.5];

    var newCenter = [];
    var i = 0;

    x.forEach(function (j, index) {
        newCenter[i] = centerC[0] + j * size[0] * dim[0];                  // x - center
        newCenter[i + 1] = centerC[1] + y[index] * size[1] * dim[1];       // y - center
        i += 2;
    });

    multipleLines(ctx, newCenter, color, thickness);
}

function textPrint(txt, ctx, fontSize, cords, color, align, angle) {   // c = center, l = left, r = right  
    if (!angle) angle = 0;

    ctx.translate(cords[0], cords[1]);
    ctx.rotate(deg2rad(angle));
    ctx.translate(-cords[0], -cords[1]);

    if (fontSize == undefined) {
        fontSize = pSwitch.fontSize;
    }

    var fontTp = Math.round(fontSize).toString() + pSwitch.fontType;
    ctx.font = fontTp;
    if (align == "r" || align == "right") {
        x0 = cords[0] - ctx.measureText(txt).width;
        y0 = cords[1] + Math.round(fontSize) / 2;
    } else if (align == "l" || align == "left") {
        x0 = cords[0];
        y0 = cords[1] + Math.round(fontSize) / 2;
    } else {
        x0 = cords[0] - ctx.measureText(txt).width / 2;
        y0 = cords[1] + Math.round(fontSize) / 2;
    }

    if (color) {
        ctx.fillStyle = color;
    } else {
        ctx.fillStyle = "#e6ffff";
    }

    ctx.fillText(txt, x0, y0);

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function concentricC(ctx, circleCenter, radius_array, color) {

    circleStroke(ctx, circleCenter, radius_array[0], color);
    circleStroke(ctx, circleCenter, radius_array[1], color);
}

function circleStroke(ctx, center, radius, color) {
    if (color) {
        ctx.strokeStyle = color;
    } else {
        ctx.strokeStyle = "#e6ffff";
    }
    ctx.beginPath();
    ctx.moveTo(center[0] + radius * Math.cos(-Math.PI / 2), center[1] + radius * Math.sin(-Math.PI / 2));
    ctx.arc(center[0], center[1], radius, -Math.PI / 2, 2.5 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}

function nDigits(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function deg2rad(angleD) {
    return angleD * Math.PI / 180;
}

function rad2deg(angleR) {
    return angleR * 180 / Math.PI;
}

function lineTicks(ctx, cords, size, numTicks, orientation) {
    // cords = local origin (x, y)
    // size = [length, tickwidth]
    // orientation = vertical ("v") or horizontal ("h")
    // numTicks = number of ticks
    // patternType = "uniform" | "edgeLong" | "alternate"   /*Deprecated*/
    // numTicks = number of ticks

    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ffffff";

    ctx.beginPath();

    if (orientation === "h") {
        ctx.moveTo(cords[0], cords[1]);
        ctx.lineTo(cords[0] + size[0], cords[1]);

        ctx.stroke();

        for (i = 1; i <= numTicks; i++) {
            if (i == 1 || i == numTicks) {
                ctx.moveTo(cords[0] + size[0] / (numTicks - 1) * (i - 1), cords[1]);
                ctx.lineTo(cords[0] + size[0] / (numTicks - 1) * (i - 1), cords[1] - size[1]);
            } else {
                ctx.moveTo(cords[0] + size[0] / (numTicks - 1) * (i - 1), cords[1]);
                ctx.lineTo(cords[0] + size[0] / (numTicks - 1) * (i - 1), cords[1] - 0.75 * size[1]);
            }
            ctx.stroke();
        }
    } else if (orientation === "v") {
        ctx.moveTo(cords[0], cords[1]);
        ctx.lineTo(cords[0], cords[1] + size[1]);

        ctx.stroke();

        for (i = 1; i <= numTicks; i++) {
            if (i == 1 || i == numTicks) {
                // ctx.moveTo(cords[0] + size[0] / (numTicks - 1) * (i - 1), cords[1]);
                // ctx.lineTo(cords[0] + size[0] / (numTicks - 1) * (i - 1), cords[1] - size[1]);

                ctx.moveTo(cords[0], cords[1] + size[1] / (numTicks - 1) * (i - 1));
                ctx.lineTo(cords[0] + size[0], cords[1] + size[1] / (numTicks - 1) * (i - 1));

            } else {
                ctx.moveTo(cords[0], cords[1] + size[1] / (numTicks - 1) * (i - 1));
                ctx.lineTo(cords[0] + 0.75 * size[0], cords[1] + size[1] / (numTicks - 1) * (i - 1));
            }
            ctx.stroke();
        }
    }

    ctx.closePath();
}

function arcTicks(ctx, center, radius, termAngles, numTicks, tickSize) {
    // center = [centerX, centerY]
    // radius = arc radius
    // termAngles = [startAngle, endAngle]
    // numTicks = number of ticks
    // tickSize = max thickness of ticks

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    // ctx.moveTo(center[0] + radius * Math.cos(termAngles[0]), center[1] - radius * Math.sin(termAngles[0]))
    ctx.arc(center[0], center[1], radius, deg2rad(termAngles[0]), deg2rad(termAngles[1]), false);
    ctx.stroke();
    ctx.closePath();

    for (var i = 1; i <= numTicks; i++) {
        ctx.beginPath();
        ctx.moveTo(center[0] + radius * Math.cos(deg2rad(termAngles[0] + (i - 1) * (termAngles[1] - termAngles[0]) / (numTicks - 1))),
            center[1] + radius * Math.sin(deg2rad(termAngles[0] + (i - 1) * (termAngles[1] - termAngles[0]) / (numTicks - 1))));
        ctx.lineTo(center[0] + (radius - tickSize) * Math.cos(deg2rad(termAngles[0] + (i - 1) * (termAngles[1] - termAngles[0]) / (numTicks - 1))),
            center[1] + (radius - tickSize) * Math.sin(deg2rad(termAngles[0] + (i - 1) * (termAngles[1] - termAngles[0]) / (numTicks - 1))));

        ctx.stroke();
        ctx.closePath();
    }
    // ctx.closePath();
}

function airfoil(ctx, cords, size) {
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(cords[0], cords[1]);
    ctx.lineTo(cords[0] - 0.9 * size[0], cords[1]);
    ctx.lineTo(cords[0] - size[0], cords[1] - 0.20 * size[1]);
    ctx.lineTo(cords[0] - 0.99 * size[0], cords[1] - 0.50 * size[1]);
    ctx.lineTo(cords[0] - 0.97 * size[0], cords[1] - 0.65 * size[1]);
    ctx.lineTo(cords[0] - 0.80 * size[0], cords[1] - size[1]);
    ctx.lineTo(cords[0] - 0.40 * size[0], cords[1] - size[1]);
    ctx.lineTo(cords[0], cords[1] - 0.50 * size[1]);

    ctx.stroke();
    ctx.closePath();
}

function trimPtr(ctx, val, cords, ptrSize, trimType) {
    // trimType = "STAB" | "RUD" | "AIL"
    // ptrSize = [base, height] of the triangular portion only

    ctx.lineWidth = 1;

    ctx.beginPath();
    if (trimType == "STAB") {
        ctx.moveTo(cords[0], cords[1]);
        ctx.lineTo(cords[0] + ptrSize[1], cords[1] - ptrSize[0] / 2);
        ctx.lineTo(cords[0] + ptrSize[1] + ctx.measureText("000").width, cords[1] - ptrSize[0] / 2);
        ctx.lineTo(cords[0] + ptrSize[1] + ctx.measureText("000").width, cords[1] + ptrSize[0] / 2);
        ctx.lineTo(cords[0] + ptrSize[1], cords[1] + ptrSize[0] / 2);
        ctx.lineTo(cords[0], cords[1]);
    } else if (trimType == "AIL") {
        ctx.moveTo(cords[0], cords[1]);
        ctx.lineTo(cords[0] - ptrSize[0] / 2, cords[1] + ptrSize[1]);
        ctx.lineTo(cords[0] + ptrSize[0] / 2, cords[1] + ptrSize[1]);
        ctx.lineTo(cords[0], cords[1]);
    } else if (trimType == "RUD") {
        ctx.moveTo(cords[0], cords[1]);
        ctx.lineTo(cords[0] - ptrSize[0] / 2, cords[1] - ptrSize[1]);
        ctx.lineTo(cords[0] + ptrSize[0] / 2, cords[1] - ptrSize[1]);
        ctx.lineTo(cords[0], cords[1]);
    } else {
        console.log("trimType match not found");
    }
    ctx.strokeStyle = "#00ff00";
    ctx.stroke();
    ctx.closePath();
}

function geo_triangle(ctx, cords, size, strokeColor, angle) {    // size[] = [base, height]
    if (!angle) angle = 0;

    ctx.translate(cords[0], cords[1]); ctx.rotate(deg2rad(angle)); ctx.translate(-cords[0], -cords[1]);

    ctx.beginPath();
    ctx.moveTo(cords[0], cords[1]);
    ctx.lineTo(cords[0] - size[0] / 2, cords[1] + size[1]);
    ctx.lineTo(cords[0] + size[0] / 2, cords[1] + size[1]);
    ctx.lineTo(cords[0], cords[1]);


    if (!strokeColor) strokeColor = "#ffffff";
    ctx.strokeStyle = strokeColor;
    ctx.stroke();

    ctx.closePath();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function geo_triangle_open(ctx, cords, size, strokeColor, angle) {    // size[] = [base, height]
    if (!angle) angle = 0;

    ctx.translate(cords[0], cords[1]); ctx.rotate(deg2rad(angle)); ctx.translate(-cords[0], -cords[1]);

    ctx.beginPath();
    ctx.moveTo(cords[0] - size[0] / 2, cords[1] + size[1]);
    ctx.lineTo(cords[0], cords[1]);
    ctx.lineTo(cords[0] + size[0] / 2, cords[1] + size[1]);

    if (!strokeColor) strokeColor = "#e6ffff";
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
}


function coordDef(latTgt, lonTgt) {
    var tgtPos = {
        geodetic: { lat: 0, lon: 0 },
        cartesian: { dx: 0, dy: 0, dz: 0 },
        polar: { dr: 0, azimuth: 0, angle: 0 },
        cylindrical: { drho: 0, dphi: 0, dz: 0 }
    };

    var sourcePos = {
        geodetic: {
            lat: deg2rad(data.latlon.lat0),
            lon: deg2rad(data.latlon.lon0)
        }
    };

    /* Updating airport's geographic coordinates with respect to earth's center */
    tgtPos.geodetic.lat = deg2rad(latTgt);
    tgtPos.geodetic.lon = deg2rad(lonTgt);

    /* Updating airport's cartesian coordinates with respect to the aircraft */
    const r_earth = 6378 / 1.852;

    tgtPos.cartesian.dx = (r_earth + data.alt.radio / 6076.11549) * (
        Math.cos(tgtPos.geodetic.lat) *
        Math.cos(tgtPos.geodetic.lon) -
        Math.cos(sourcePos.geodetic.lat) *
        Math.cos(sourcePos.geodetic.lon));

    tgtPos.cartesian.dy = (r_earth + data.alt.radio / 6076.11549) * (
        Math.cos(tgtPos.geodetic.lat) *
        Math.sin(tgtPos.geodetic.lon) -
        Math.cos(sourcePos.geodetic.lat) *
        Math.sin(sourcePos.geodetic.lon));

    tgtPos.cartesian.dz = (r_earth * (1 - Math.exp(2)) + data.alt.radio / 6076.11549) *
        Math.sin(tgtPos.geodetic.lon) -
        (r_earth * (1 - Math.exp(2)) * Math.sin(sourcePos.geodetic.lon));

    /* Updating airport's geodetic coordinates with respect to the aircraft */
    tgtPos.cylindrical.drho = Math.sqrt(
        tgtPos.cartesian.dx ** 2 +
        tgtPos.cartesian.dy ** 2);
    tgtPos.cylindrical.dphi = Math.atan2(
        tgtPos.cartesian.dy,
        tgtPos.cartesian.dx);
    tgtPos.cylindrical.dz = tgtPos.cartesian.dz;

    return tgtPos;
}

function singleLine(ctx, cords, color, thickness) {
    // cords = [start vector, end vector] (4x1 row matrix)
    if (color) {
        ctx.strokeStyle = color;
    } else {
        ctx.strokeStyle = "#00ff00";
    }

    if (thickness) {
        ctx.lineWidth = thickness;
    } else {
        ctx.lineWidth = 1;
    }

    ctx.beginPath();
    ctx.moveTo(cords[0], cords[1]);
    ctx.lineTo(cords[2], cords[3]);
    ctx.stroke();
    ctx.closePath();
}

function multipleLines(ctx, cords, color, thickness) {
    if (color) {
        ctx.strokeStyle = color;
    } else {
        ctx.strokeStyle = "#00ff00";
    }

    if (thickness) {
        ctx.lineWidth = thickness;
    } else {
        ctx.lineWidth = 1;
    }

    var i;

    ctx.beginPath();
    ctx.moveTo(cords[0], cords[1]);
    var l = cords.length - 1;
    for (i = 2; i <= l; i += 2) {
        ctx.lineTo(cords[i], cords[i + 1]);
    }
    ctx.stroke();
    ctx.closePath();
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
