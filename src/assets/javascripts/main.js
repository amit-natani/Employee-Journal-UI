

// or just with selector string
setTimeout(function() {
  const ps = new PerfectScrollbar('.sidebar-wrapper', {
    wheelSpeed: 2,
    wheelPropagation: true,
    minScrollbarLength: 20
  });

  $(function(){
    $(".btn-icon").on('click',function(){
      $(this).find('i').toggleClass("fa-ellipsis-v");
      $('body').toggleClass('sidebar-mini');
    });


$('.change-view').on('click',function(){

  $('.chart-view').toggleClass('in')
});


$('[data-toggle="tooltip"]').tooltip();

    if($('#doughnutChart')[0]){
      // Get context with jQuery - using jQuery's .get() method.
      var doughnutChartCanvas = $("#doughnutChart").get(0).getContext("2d");
  
      var config = {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [
              11,
              16,
              7,
              3,
              14
            ],
            backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
            ],
            label: 'My dataset' // for legend
  
            
          }],
          labels: [
            "Self Learning",
            "Project Meetings",
            "Misc Activities",
            "Project Tasks",
            "Support Projects"
          ]
        },
        options: {
          responsive: true,
          legend: {
            display: false
          }
        }
      };
      
       var myDoughnutChart = new Chart(doughnutChartCanvas, config);
  
    }
    
    /*---------------------
    ----- AREA CHART -----
    ---------------------*/

	var config = {
		type: 'line',
		data: {
			labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                datasets: [{
                    label: "Progress",
                    backgroundColor: "#FF8A80",
                    borderColor: "#FF8A80",
                    data: [
                        45, 
                        75, 
                        26, 
                        23, 
                        60, 
                        48, 
                        9,
                        45, 
                        75, 
                        26, 
                        23, 
                        60, 
                        48, 
                        9
                    ],
                    fill: true,
                }]
            },
		options: {
			responsive: true,
			title:{
				display:true,
				text:'Overall Progress'
			},
			tooltips: {
				mode: 'index',
				intersect: false,
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Month'
					}
				}],
				yAxes: [{
					display: true,
					scaleLabel: {
						display: true,
						labelString: 'Value'
					}
				}]
			}
		}
	};

	if($('#areaChart')[0]){
		
		// Get context with jQuery - using jQuery's .get() method.
		var areaChartCanvas = $("#areaChart").get(0).getContext("2d");
		
		//Create the line chart
		var areaChart = new Chart(areaChartCanvas, config);

  }
  
  /*---------------------
    ----- BAR CHART -----
    ---------------------*/
    
    
	var barChartData = {
		labels: ["January", "February", "March", "April", "May", "June", "July"],
		datasets: [{
			label: 'Dataset 1',
			backgroundColor: "#FF6384",
			borderColor: "#FF6384",
			borderWidth: 1,
			data: [
					45, 
					75, 
					26, 
					23, 
					60, 
					-48, 
					-9
			]
		}, {
			label: 'Dataset 2',
			backgroundColor: "#36A2EB",
			borderColor: "#36A2EB",
			borderWidth: 1,
			data: [
					-10, 
					16, 
					72, 
					93, 
					29, 
					-74, 
					64
			]
		}]

	};
    
    
	var config = {
					type: 'bar',
					data: barChartData,
					options: {
						responsive: true,
						legend: {
							position: 'top',
						},
						title: {
							display: true,
							text: 'Chart.js Bar Chart'
						}
					}
                }

    
	if($('#barChart')[0]){
		var barChartCanvas = $("#barChart").get(0).getContext("2d");
		var barChart = new Chart(barChartCanvas, config);

	}


  });
}, 1000)