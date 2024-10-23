class Topsis {
    normalize(performanceScore) {
        const row = performanceScore.length;
        const col = performanceScore[0].length;

        // const criteria = ["C1", "C2", "C3", "C4", "C5", "C6",  "C7", "C8", "C9"];
        // const majors = ["IT", "DS", "CS"];


        const sqrdSum = new Array(col).fill(0);
        const normalizedMatrix = Array.from({ length: row }, () => new Array(col).fill(0));

        // Calculate squared sums
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                sqrdSum[j] += Math.pow(performanceScore[i][j], 2);
            }
        }

        // Normalize the performance score
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                normalizedMatrix[i][j] = performanceScore[i][j] / Math.sqrt(sqrdSum[j]);
            }
        }

        return normalizedMatrix;
    }

    weightCal(normalizedMatrix) {
        const weights = [0.2, 0.15, 0.15, 0.125, 0.125, 0.1, 0.05, 0.05, 0.05];

        const row = normalizedMatrix.length;
        const col = normalizedMatrix[0].length;

        const weightedNormalized = Array.from({ length: row }, () => new Array(col).fill(0));

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                weightedNormalized[i][j] = normalizedMatrix[i][j] * weights[j];
            }
        }

        return weightedNormalized;
    }

    idealSolution(weightedNormalized) {
        const row = weightedNormalized.length;
        const col = weightedNormalized[0].length;

        const worstSolution = new Array(col).fill(Infinity);
        const bestSolution = new Array(col).fill(-Infinity);

        // Find worst and best solutions
        for (let j = 0; j < col; j++) {
            for (let i = 0; i < row; i++) {
                worstSolution[j] = Math.min(worstSolution[j], weightedNormalized[i][j]);
                bestSolution[j] = Math.max(bestSolution[j], weightedNormalized[i][j]);
            }
        }
        const worstDistance = new Array(row).fill(0);
        const bestDistance = new Array(row).fill(0);

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                worstDistance[i] += Math.pow(weightedNormalized[i][j] - worstSolution[j], 2);
                bestDistance[i] += Math.pow(weightedNormalized[i][j] - bestSolution[j], 2);
            }
        }

        for (let i = 0; i < row; i++) {
            worstDistance[i] = Math.sqrt(worstDistance[i]);
            bestDistance[i] = Math.sqrt(bestDistance[i]);
        }

        const bestSimilarity = new Array(row).fill(0);
        for (let i = 0; i < row; i++) {
            bestSimilarity[i] = worstDistance[i] / (worstDistance[i] + bestDistance[i]);
        }

        return bestSimilarity;
    }

    rank(bestSimilarity) {
        const length = bestSimilarity.length;
        const ranks = new Array(length).fill(0);

        for (let i = 0; i < length; i++) {
            let rank = 1;
            for (let j = 0; j < length; j++) {
                if (bestSimilarity[j] > bestSimilarity[i]) {
                    rank++;
                }
            }
            ranks[i] = rank;
        }

        return ranks;
    }
}

export default Topsis;
