angular.module('angularjsTutorial')
  .directive('ajstTodoGraph', ['$window', '$log', function($window, $log) {
    return {
      restrict: 'E',
      template : '<div class="ajst-todo-graph"><h2>Number of todos by creation date</h2></div>',
      scope : {
        todos : '='
      },
      replace : true,
      link: function (scope, element, attrs, controller) {

        var margin = {top: 30, right: 30, bottom: 30, left: 30},
          outerMargin = 30,
          width = $(element[0]).width() - (outerMargin * 2),
          height = width,
          colorScale = d3.scale.category20c();

        var render = function(){
          element.find('svg').remove();

          var dataByCreatedAt = d3.nest()
            .key(function(d){
              return $window.moment(d.createdAt).startOf('day').toDate().toString();
            })
            .rollup(function(leaves) {
              return {
                "numCreated" : leaves.length
              }
            })
            .entries(scope.todos);

          var dataByCompletedAt = d3.nest()
            .key(function(d){
              return $window.moment(d.completedAt).startOf('day').toDate().toString();
            })
            .rollup(function(leaves) {
              return {
                "numCompleted" : leaves.length
              }
            })
            .entries(scope.todos);

          $log.log('dataByCreatedAt', dataByCreatedAt);

          var svg = d3.select(element[0])
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");;


          var xAxisScale = d3.time.scale()
            .range([0, width])
            .domain([
              d3.min(scope.todos, function(todo){ return todo.createdAt.valueOf(); }),
              d3.max(scope.todos, function(todo){ return todo.createdAt.valueOf(); })
            ]);

          var yAxisScale = d3.scale.linear()
            .range([height, 0])
            .domain([0, d3.max(dataByCreatedAt, function(obj){ return obj.values.numCreated; })]);

          var xAxis = d3.svg.axis()
            .scale(xAxisScale)
            .orient('bottom');

          var yAxis = d3.svg.axis()
            .scale(yAxisScale)
            .orient('left');

          var xAxisElement = svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (height) + ')')
            .call(xAxis);


          var yAxisElement = svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(-' + margin.left + ',0)')
            .call(yAxis);


          var dates = svg.selectAll('.date')
            .data(dataByCreatedAt)
            .enter().append('g')
            .attr('class', 'g date')
            .attr('transform', function(d) {
              return 'translate(' + xAxisScale(new Date(d.key)) + ',0)';
            });

          dates.append('rect')
            .attr('width', 20)
            .attr('y', function(d) { return yAxisScale(d.values.numCreated); })
            .attr('height', function(d) { return height - yAxisScale(d.values.numCreated); })
            .style('fill', '#a05d56  ');
        }

        scope.$watch('todos', function(val) {
          $log.log('scope.todos changed', val);
          render();
        }, true);




      }
    };
  }]);
