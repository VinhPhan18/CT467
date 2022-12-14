var app = angular.module("testApp",  ['bsTable']);
app.controller("resultmemberCtl", function($scope,$http) {
    $scope.Results=[];
    $scope.check=false;
    $scope.result=null;
    $scope.result={};

    $scope.getIDUser=function(){
        $http.get("http://localhost/CT467_04UDW/Sources/user/exam/controller/getIDUser.php?method=load_IDUser").then(function (response) {
        $scope.IDUser = response.data;
        console.log($scope.IDUser);
        $scope.getResults($scope.IDUser);
    });
    }
    $scope.getIDUser();

    $scope.getResults= function(IDUser){
        var request = $http({
            method: "POST",
            url: "http://localhost/CT467_04UDW/Sources/user/result/controller/getResults.php?method=load_Results",
            data: {
                userID: IDUser
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        
        /* Check whether the HTTP Request is successful or not. */
            request.then(function (response) {  
                $scope.Results=response.data.records;
                $scope.bsTableResultControl.options.data = $scope.Results;
                $scope.bsTableResultControl.options.totalRows = $scope.Results.length; 
        });
}
    
    $scope.bsTableResultControl = {
        options: {
            data: $scope.Result,
            idField: 'id',
            sortable: true,
            striped: true,
            search: true,
            maintainSelected: true,
            clickToSelect: true,
            showColumns: false,
            singleSelect: true,
            showToggle: true,
            pagination: true,
            pageSize: 10,
            pageList: [5, 10, 25, 50, 100],
            onCheck: function (row, $element) {
                $scope.$apply(function () {
                    $scope.check=true;
                    $scope.result=row;
                });
            },
            onUncheck: function (row, $element) {
                $scope.check=false;
               $scope.result={};
               console.log($scope.check);
            },
            columns: [{
                field: 'state',
                checkbox: true
            }
            , {
                field: 'ID_User',
                title: 'M?? th?? sinh',
                align: 'center',
                valign: 'bottom',
                sortable: true
            }
            , {
                field: 'firstname',
                title: 'H???',
                align: 'center',
                valign: 'bottom',
                sortable: true
            }
            , {
                field: 'lastname',
                title: 'T??n',
                align: 'center',
                valign: 'bottom',
                sortable: true
            }
            , {
                field: 'name',
                title: 'T??n b??i ki???m tra',
                align: 'center',
                valign: 'bottom',
                sortable: true
            }
            ,
            {
                field: 'score',
                title: '??i???m s???',
                align: 'center',
                valign: 'bottom',
                sortable: true
            }
        ]
        }
    };
    
});