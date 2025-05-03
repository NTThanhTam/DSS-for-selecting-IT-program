import * as d3 from 'd3';
import React, { useEffect, useRef, useState } from 'react';


export function FacultyPieChart() {
    const svgRef = useRef();

    const tooltipRef = useRef();
    const [year, setYear] = useState('2022')

    var rowConverter = (d) => {
        return {
        year: d.Year,
        major: d.Major,
        code: d.Code,
        totalStudent: parseInt(d["Total Students"]),
        femaleStudent: parseInt(d["Female Students"]),
        maleStudent: parseInt(d["Male Students"]),
        averageGPA: parseFloat(d["Average GPA"])
        };
    }
    useEffect(() => {
        d3.csv("/school_insight.csv", rowConverter).then((data) => {

            var used_data = data.filter((d) => {
                return d.year === year
            })

            const width = 400;
            const height = 400;
            const radius = (Math.min(width, height) / 2) - 50;

            // Clear any previous content
            d3.select(svgRef.current).selectAll('*').remove();

            // Color scale
            const color = d3.scaleOrdinal(['#FFF1C9', '#F7B7A3', '#EA5F89', '#9B3192']);

            // Create the pie and arc generators
            const pie = d3.pie().value(d => d.totalStudent);
            const arc = d3.arc().innerRadius(0).outerRadius(radius);

            // SVG container
            const svg = d3.select(svgRef.current)
                .attr('width', width)
                .attr('height', height);

            // Create a group for the pie chart
            const g = svg.append('g')
                .attr('transform', `translate(${width / 2}, ${height / 2})`);

            // Pie chart
            const arcs = pie(used_data);

            // Create the tooltip
            const tooltip = d3.select(tooltipRef.current)
                .style('position', 'absolute')
                .style('visibility', 'hidden')                
                .style('background', 'white')
                .style('padding', '5px')
                .style('border', '1px solid #ccc')
                .style('border-radius', '5px')
                .style('pointer-events', 'none');

            g.selectAll('path')
                .data(arcs)
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', (d, i) => color(i))
                .attr('stroke', '#172554')
                .attr('stroke-width', 2)
                .on('mouseover', function (event, d) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('transform', 'scale(1.2)'); // Scale up on hover

                    tooltip.html(`
                            <strong>${d.data.major}</strong><br>
                            Total Students: ${d.data.totalStudent}<br>
                            Average GPA: ${d.data.averageGPA.toFixed(2)}
                        `)
                        .style('visibility', 'visible')
                        .style('top', (event.pageY - 10) + 'px')
                        .style('left', (event.pageX + 10) + 'px');
                    })
                .on('mouseout', function (event, d) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('transform', 'scale(1)'); // Scale back down
                    tooltip.style('visibility', 'hidden'); // Hide tooltip

                });

                

            // Labels
            g.selectAll('text')
                .data(arcs)
                .enter()
                .append('text')
                .attr('transform', d => `translate(${arc.centroid(d)})`)
                .attr('width', radius)
                .attr('height', radius)
                .attr('dy', '0.35em')
                .style('cursor', 'default')
                .style('font-size', '20')
                .style('fill', '#172554')
                .style('font-weight', 'bold')
                .text(d => d.data.code);
        }).catch(error => {
            console.error("Error loading the CSV file:", error);
        });
    }, [year]);


    var handleYearChange = (event) => {
        setYear(event.target.value)
    }

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center space-y-4'>
                <h2 className='dark:text-white text-xl font-bold'>Total Students by Major in IU</h2>
                <div className='flex flex-row space-x-4'>
                    <h3 className='dark:text-white'>Year of: </h3>
                    <select onChange={handleYearChange}>
                        <option value='2022'>2022</option>
                        <option value='2023'>2023</option>
                        <option value='2024'>2024</option>
                    </select>
                </div>

            </div>
            <div ref={tooltipRef}></div>
            <svg ref={svgRef}></svg>
            <div class="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                School of Computer Science and Technology, International University, 2025
            </div>
        </div>

    )
}

export function FacultyBarChart() {
    const svgRef = useRef();
    const tooltipRef = useRef();
    const legendRef = useRef();

    const [major, setMajor] = useState('IT')

    var rowConverter = (d) => {
        return {
        year: d.Year,
        major: d.Major,
        code: d.Code,
        totalStudent: parseInt(d["Total Students"]),
        femaleStudent: parseInt(d["Female Students"]),
        maleStudent: parseInt(d["Male Students"]),
        averageGPA: parseFloat(d["Average GPA"])
        };
    }
    useEffect(() => {
        d3.csv("/school_insight.csv", rowConverter).then((data) => {

            var used_data = data.filter((d) => {
                return d.code === major
            })

            const margin = { top: 20, right: 30, bottom: 40, left: 40 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            d3.select(svgRef.current).selectAll('*').remove();

            // Color scale
            
            const color = {female: '#EA5F89',
                            male: 'blue'
            }

            var svg = d3.select(svgRef.current)
                        .append("svg")
                        .attr("width", 600)
                        .attr("height", 400)
                        .style("display", "block")   
                        
            const years = used_data.map(d => d.year)
            const max_totalStudent = d3.max(data, d => d.totalStudent)

            const x = d3.scaleBand()
                        .domain(years)
                        .range([0, width])
                        .padding(0.1);
                        

            const y = d3.scaleLinear()
                        .domain([0, max_totalStudent])
                        .range([height, 0]);
    
            const g = svg.append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

            const tooltip = d3.select(tooltipRef.current)
                            .style('position', 'absolute')
                            .style('visibility', 'hidden')                
                            .style('background', 'white')
                            .style('padding', '5px')
                            .style('border', '1px solid #ccc')
                            .style('border-radius', '5px')
                            .style('pointer-events', 'none');
    
            // Create x-axis
            g.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll('text') // Change text color of x-axis
                .style('fill', 'white')

            svg.select(".x-axis line").style("stroke", "white");
            svg.select(".x-axis path").style("stroke", "white");

            // Create y-axis
            g.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(y))
                .selectAll('text') // Change text color of y-axis
                .style('fill', 'white');

            svg.select(".y-axis line").style("stroke", "white");
            svg.select(".y-axis path").style("stroke", "white");

    
            // Create bars for female students
            g.selectAll('.bar-female')
                .data(used_data)
                .enter()
                .append('rect')
                .attr('class', 'bar-female')
                .attr('x', d => x(d.year) - (x.bandwidth() / 2) / 2)
                .attr('y', d => y(d.femaleStudent) + (height - y(d.femaleStudent)))
                .attr('width', (x.bandwidth() / 2) / 2)
                .attr('height', 0)
                .attr('fill', color.female)
                .attr('transform', d => `translate(${x.bandwidth() / 2}, 0)`)
                .on('mouseover', function (event, d) {
                    g.selectAll('.bar-male').attr('fill', '#7393B3')
                    g.selectAll('.bar-female').attr('fill', '#7393B3')
                    d3.select(this).attr('fill', color.female)

                    tooltip.html(`
                            <strong>Total Students: </strong>${d.femaleStudent}
                        `)
                        .style('visibility', 'visible')
                        .style('top', (event.pageY - 10) + 'px')
                        .style('left',  (event.pageX + 10) + 'px');
                    })
                .on('mouseout', function (event, d) {
                    g.selectAll('.bar-male').attr('fill', color.male)
                    g.selectAll('.bar-female').attr('fill', color.female)
                    
                    tooltip.style('visibility', 'hidden');
                })
                .transition()
                .duration(500)
                .attr('y', d => y(d.femaleStudent))
                .attr('height', d => height - y(d.femaleStudent))


            // Create bars for male students
            g.selectAll('.bar-male')
                .data(used_data)
                .enter()
                .append('rect')
                .attr('class', 'bar-male')
                .attr('x', d => x(d.year) + x.bandwidth() / 2)
                .attr('y', d => y(d.maleStudent) + height - y(d.maleStudent))
                .attr('width', (x.bandwidth() / 2) / 2)
                .attr('height', 0)
                .attr('fill', color.male)
                .on('mouseover', function (event, d) {
                    g.selectAll('.bar-male').attr('fill', '#7393B3')
                    g.selectAll('.bar-female').attr('fill', '#7393B3')
                    d3.select(this).attr('fill', color.male)

                    tooltip.html(`
                            <strong>Total Students: </strong>${d.maleStudent}
                        `)
                        .style('visibility', 'visible')
                        .style('top', (event.pageY - 10) + 'px')
                        .style('left',  (event.pageX + 10) + 'px');
                    })
                .on('mousemove', (event) => {
                        tooltip.style('top', (event.pageY - 10) + 'px')
                            .style('left', (event.pageX + 10) + 'px');
                    })
                .on('mouseout', function (event, d) {
                    g.selectAll('.bar-male').attr('fill', color.male)
                    g.selectAll('.bar-female').attr('fill', color.female)

                    tooltip.style('visibility', 'hidden');
                })
                .transition()
                .duration(500)
                .attr('y', d => y(d.maleStudent))
                .attr('height', d => height - y(d.maleStudent))

            g.selectAll('.text-female')
                .data(used_data)
                .enter()
                .append('text')
                .attr('class', 'text-female')
                .attr('x', d => x(d.year) + x.bandwidth()/4  + 10)
                .attr('y', d => y(d.femaleStudent) - 10)
                .style('font-size', '10')
                .style('fill', 'white')
                .style('font-weight', 'light')
                .text(d => d.femaleStudent);

            g.selectAll('.text-male')
                .data(used_data)
                .enter()
                .append('text')
                .attr('class', 'text-male')
                .attr('x', d => x(d.year) + x.bandwidth()/2 + 10)
                .attr('y', d => y(d.maleStudent) - 10)
                .style('font-size', '10')
                .style('fill', 'white')
                .style('font-weight', 'light')
                .text(d => d.maleStudent);

        const legendWidth = 100
        const legendHeight = 100

        const svgLegend = d3.select(legendRef.current)
                .attr('width', legendWidth)
                .attr('height', legendHeight);

        d3.select(legendRef.current).selectAll('*').remove();
        svgLegend.append("circle").attr("cx",legendWidth/10).attr("cy",(legendHeight/5)*2).attr("r", 6).style("fill", color.female)
        svgLegend.append("circle").attr("cx",legendWidth/10).attr("cy",(legendHeight/5)*4).attr("r", 6).style("fill", color.male)

        svgLegend.append("text").attr("x", legendWidth/5).attr("y", (legendHeight/5)*2).text("Female").style("font-size", "15px").attr("alignment-baseline","middle").style('fill', 'white')
        svgLegend.append("text").attr("x", legendWidth/5).attr("y", (legendHeight/5)*4).text("Male").style("font-size", "15px").attr("alignment-baseline","middle").style('fill', 'white')

        }).catch(error => {
            console.error("Error loading the CSV file:", error);
        });
    }, [major]);

    var handleMajorChange = (event) => {
        setMajor(event.target.value)
    }
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center space-y-4'>
                <h2 className='dark:text-white text-xl font-bold'>Students by Gender in IU from 2022 to 2024</h2>
                <div className='flex flex-row space-x-4'>
                    <h3 className='dark:text-white'>Major: </h3>
                    <select onChange={handleMajorChange}>
                        <option value='IT'>IT</option>
                        <option value='CS'>CS</option>
                        <option value='DS'>DS</option>
                    </select>
                </div>

            </div>
            <section className='flex flex-row space-x-4 justify-center items-center'>
                <div ref={tooltipRef}></div>
                <svg ref={svgRef} width={600} height={400}></svg>
                <svg ref={legendRef} width={100} height={100}></svg>
            </section>
            <div class="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
                School of Computer Science and Technology, International University, 2025
            </div>
        </div>

    )
}

export function MarketBarChart() {
    const svgRef = useRef();
    const tooltipRef = useRef();
    const legendRef = useRef();

    const [year, setYear] = useState('2021')

    var rowConverter = (d) => {
        return {
        year: d.Year,
        major: d.Major,
        code: d.Code,
        jobGrowthRate: parseInt(d["Job Growth Rate (%)"]),
        marketDemand: parseInt(d["Market Demand"]),
        averageSalary: parseInt(d["Average Salary (USD)"]),
        };
    }
    useEffect(() => {
        d3.csv("/market_insight.csv", rowConverter).then((data) => {
            var used_data = data.filter((d) => {
                return d.year === year
            })
            console.log(used_data)
            const majorCode = used_data.map(d => d.code)

            const margin = { top: 20, right: 30, bottom: 40, left: 40 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            d3.select(svgRef.current).selectAll('*').remove();

            // Color scale
            
            const color = {IT: '#FFF1C9',
                            CS: '#EA5F89',
                            DS: 'blue'
            }

            var svg = d3.select(svgRef.current)
                        .append("svg")
                        .attr("width", 600)
                        .attr("height", 400)
                        .style("display", "block")   
                        
            const max_averageSalary = d3.max(data, d => d.averageSalary)

            const x = d3.scaleBand()
                        .domain(majorCode)
                        .range([0, width])
                        .padding(0.1);
                        

            const y = d3.scaleLinear()
                        .domain([0, max_averageSalary])
                        .range([height, 0]);
    
            const g = svg.append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

            const tooltip = d3.select(tooltipRef.current)
                            .style('position', 'absolute')
                            .style('visibility', 'hidden')                
                            .style('background', 'white')
                            .style('padding', '5px')
                            .style('border', '1px solid #ccc')
                            .style('border-radius', '5px')
                            .style('pointer-events', 'none');
    
            // Create x-axis
            g.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll('text') // Change text color of x-axis
                .style('fill', 'white')

            svg.select(".x-axis line").style("stroke", "white");
            svg.select(".x-axis path").style("stroke", "white");

            // Create y-axis
            g.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(y))
                .selectAll('text') // Change text color of y-axis
                .style('fill', 'white');

            svg.select(".y-axis line").style("stroke", "white");
            svg.select(".y-axis path").style("stroke", "white");

    
            // Create bars for female students
            g.selectAll('.bar')
                    .data(used_data)
                    .enter()
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('x', d => x(d.code) + x.bandwidth() / 4)
                    .attr('y', d => y(d.averageSalary) + height - y(d.averageSalary))
                    .attr('width', x.bandwidth()/2)
                    .attr('height', 0)
                    .attr('fill', d => color[d.code])
                    .on('mouseover', function (event, d) {

                        tooltip.html(`
                                <strong>Average salary: </strong>${d.averageSalary} USD
                            `)
                            .style('visibility', 'visible')
                            .style('top', (event.pageY - 10) + 'px')
                            .style('left',  (event.pageX + 10) + 'px');
                    })
                    .on('mousemove', (event) => {
                        tooltip.style('top', (event.pageY - 10) + 'px')
                            .style('left', (event.pageX + 10) + 'px');
                    })
                    .on('mouseout', (event, d) => {
                        tooltip.style('visibility', 'hidden');
                    })
                    .transition()
                    .duration(500)
                    .attr('y', d => y(d.averageSalary))
                    .attr('height', d => height - y(d.averageSalary))


            g.selectAll('.text')
                .data(used_data)
                .enter()
                .append('text')
                .attr('class', 'text')
                .attr('x', d => x(d.code) + x.bandwidth()/4  + 25)
                .attr('y', d => y(d.averageSalary) - 10)
                .style('font-size', '10')
                .style('fill', 'white')
                .style('font-weight', 'light')
                .text(d => d.averageSalary);

        const legendWidth = 300
        const legendHeight = 150

        const svgLegend = d3.select(legendRef.current)
                .attr('width', legendWidth)
                .attr('height', legendHeight);

        d3.select(legendRef.current).selectAll('*').remove();
        svgLegend.append("circle").attr("cx",legendWidth/10).attr("cy",(legendHeight/7)*2).attr("r", 6).style("fill", color.IT)
        svgLegend.append("circle").attr("cx",legendWidth/10).attr("cy",(legendHeight/7)*4).attr("r", 6).style("fill", color.CS)
        svgLegend.append("circle").attr("cx",legendWidth/10).attr("cy",(legendHeight/7)*6).attr("r", 6).style("fill", color.DS)

        svgLegend.append("text").attr("x", legendWidth/5).attr("y", (legendHeight/7)*2).text("Information of Technology").style("font-size", "15px").attr("alignment-baseline","middle").style('fill', 'white')
        svgLegend.append("text").attr("x", legendWidth/5).attr("y", (legendHeight/7)*4).text("Computer Science").style("font-size", "15px").attr("alignment-baseline","middle").style('fill', 'white')
        svgLegend.append("text").attr("x", legendWidth/5).attr("y", (legendHeight/7)*6).text("Data Science").style("font-size", "15px").attr("alignment-baseline","middle").style('fill', 'white')

        }).catch(error => {
            console.error("Error loading the CSV file:", error);
        });
    }, [year]);

    var handleYearChange = (event) => {
        setYear(event.target.value)
    }
    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center space-y-4'>
                <h2 className='dark:text-white text-l font-bold'>Income through years</h2>
                <div className='flex flex-row space-x-4'>
                    <h3 className='dark:text-white'>Year: </h3>
                    <select onChange={handleYearChange}>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                        <option value='2023'>2023</option>
                    </select>
                </div>

            </div>
            <section className='py-20 flex flex-row space-x-4 justify-center items-center'>
                <div ref={tooltipRef}></div>
                <svg ref={svgRef} width={600} height={400}></svg>
                <svg ref={legendRef} width={100} height={100}></svg>
            </section>
        </div>

    )
}

export function ITWorkforceBarChart() {
    const svgRef = useRef();
    const tooltipRef = useRef();
    const legendRef = useRef();

    var rowConverter = (d) => {
        return {
        year: d.Year,
        needed: parseInt(d["Needed"]),
        shortFall: parseInt(d["Shortfall"])
        };
    }
    useEffect(() => {
        d3.csv("/IT_Workforce_Vietnam_2018_2025.csv", rowConverter).then((data) => {

            const margin = { top: 20, right: 30, bottom: 40, left: 40 };
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            d3.select(svgRef.current).selectAll('*').remove();

            // Color scale
            
            const color = {needed: '#FFF1C9',
                            shortFall: '#EA5F89'
                        }

            var svg = d3.select(svgRef.current)
                        .append("svg")
                        .attr("width", 600)
                        .attr("height", 400)
                        .style("display", "block")   
                        
            const max_needed = d3.max(data, d => d.needed)
            const max_shortFall = d3.max(data, d => d.shortFall)
            const max_data = Math.max(max_needed, max_shortFall)

            const years = data.map(d => d.year)

            const x = d3.scaleBand()
                        .domain(years)
                        .range([0, width])
                        .padding(0.1);
                        

            const y = d3.scaleLinear()
                        .domain([0, max_data])
                        .range([height, 0]);
    
            const g = svg.append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

            const tooltip = d3.select(tooltipRef.current)
                            .style('position', 'absolute')
                            .style('visibility', 'hidden')                
                            .style('background', 'white')
                            .style('padding', '5px')
                            .style('border', '1px solid #ccc')
                            .style('border-radius', '5px')
                            .style('pointer-events', 'none');
    
            // Create x-axis
            g.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll('text') // Change text color of x-axis
                .style('fill', 'white')

            svg.select(".x-axis line").style("stroke", "white");
            svg.select(".x-axis path").style("stroke", "white");

            // Create y-axis
            g.append('g')
                .attr('class', 'y-axis')
                .call(d3.axisLeft(y))
                .selectAll('text') // Change text color of y-axis
                .style('fill', 'white');

            svg.select(".y-axis line").style("stroke", "white");
            svg.select(".y-axis path").style("stroke", "white");

    
            // Create bars for female students
            g.selectAll('.bar-needed')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar-needed')
                .attr('x', d => x(d.year) - (x.bandwidth() / 2) / 2)
                .attr('y', d => y(d.needed) + (height - y(d.needed)))
                .attr('width', (x.bandwidth() / 2) / 2)
                .attr('height', 0)
                .attr('fill', color.needed)
                .attr('transform', d => `translate(${x.bandwidth() / 2}, 0)`)
                .on('mouseover', function (event, d) {
                    g.selectAll('.bar-shortFall').attr('fill', '#7393B3')
                    g.selectAll('.bar-needed').attr('fill', '#7393B3')
                    d3.select(this).attr('fill', color.needed)

                    tooltip.html(`
                            <strong>Total Students: </strong>${d.needed}
                        `)
                        .style('visibility', 'visible')
                        .style('top', (event.pageY - 10) + 'px')
                        .style('left',  (event.pageX + 10) + 'px');
                    })
                .on('mouseout', function (event, d) {
                    g.selectAll('.bar-shortFall').attr('fill', color.shortFall)
                    g.selectAll('.bar-needed').attr('fill', color.needed)
                    
                    tooltip.style('visibility', 'hidden');
                })
                .transition()
                .duration(500)
                .attr('y', d => y(d.needed))
                .attr('height', d => height - y(d.needed))


            // Create bars for male students
            g.selectAll('.bar-shortFall')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar-shortFall')
                .attr('x', d => x(d.year) + x.bandwidth() / 2)
                .attr('y', d => y(d.shortFall) + height - y(d.shortFall))
                .attr('width', (x.bandwidth() / 2) / 2)
                .attr('height', 0)
                .attr('fill', color.shortFall)
                .on('mouseover', function (event, d) {
                    g.selectAll('.bar-shortFall').attr('fill', '#7393B3')
                    g.selectAll('.bar-needed').attr('fill', '#7393B3')
                    d3.select(this).attr('fill', color.shortFall)

                    tooltip.html(`
                            <strong>Total Students: </strong>${d.shortFall}
                        `)
                        .style('visibility', 'visible')
                        .style('top', (event.pageY - 10) + 'px')
                        .style('left',  (event.pageX + 10) + 'px');
                    })
                .on('mousemove', (event) => {
                        tooltip.style('top', (event.pageY - 10) + 'px')
                            .style('left', (event.pageX + 10) + 'px');
                    })
                .on('mouseout', function (event, d) {
                    g.selectAll('.bar-shortFall').attr('fill', color.shortFall)
                    g.selectAll('.bar-needed').attr('fill', color.needed)

                    tooltip.style('visibility', 'hidden');
                })
                .transition()
                .duration(500)
                .attr('y', d => y(d.shortFall))
                .attr('height', d => height - y(d.shortFall))

            g.selectAll('.text-needed')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'text-needed')
                .attr('x', d => x(d.year) + x.bandwidth()/8 )
                .attr('y', d => y(d.needed) - 10)
                .style('font-size', '10')
                .style('fill', 'white')
                .style('font-weight', 'light')
                .text(d => d.needed);

            g.selectAll('.text-shortFall')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'text-shortFall')
                .attr('x', d => x(d.year) + x.bandwidth()/2 + 10)
                .attr('y', d => y(d.shortFall) - 10)
                .style('font-size', '10')
                .style('fill', 'white')
                .style('font-weight', 'light')
                .text(d => d.shortFall);

        const legendWidth = 100
        const legendHeight = 100

        const svgLegend = d3.select(legendRef.current)
                .attr('width', legendWidth)
                .attr('height', legendHeight);

        d3.select(legendRef.current).selectAll('*').remove();
        svgLegend.append("circle").attr("cx",legendWidth/10).attr("cy",(legendHeight/5)*2).attr("r", 6).style("fill", color.needed)
        svgLegend.append("circle").attr("cx",legendWidth/10).attr("cy",(legendHeight/5)*4).attr("r", 6).style("fill", color.shortFall)

        svgLegend.append("text").attr("x", legendWidth/5).attr("y", (legendHeight/5)*2).text("needed").style("font-size", "15px").attr("alignment-baseline","middle").style('fill', 'white')
        svgLegend.append("text").attr("x", legendWidth/5).attr("y", (legendHeight/5)*4).text("shortFall").style("font-size", "15px").attr("alignment-baseline","middle").style('fill', 'white')

        }).catch(error => {
            console.error("Error loading the CSV file:", error);
        });
    }, []);

    return (
        <div className='flex flex-col items-center'>
            <div className='flex flex-col items-center space-y-4'>
                <h2 className='dark:text-white text-xl font-bold'>IT Workforce in Vietnam from 2018 to 2025</h2>
            </div>
            <section className='py-20 flex flex-row space-x-4 justify-center items-center'>
                <div ref={tooltipRef}></div>
                <svg ref={svgRef} width={600} height={400}></svg>
                <svg ref={legendRef} width={100} height={100}></svg>
            </section>
            <div class="text-sm text-gray-600 dark:text-gray-400 text-center mt-4">
            <p class="text-right font-semibold">TopDev: Vietnam IT Market Report, from Báo cáo Vietnam IT Market Report Mới nhất 2023 (2023)</p>
            </div>

        </div>

    )
}