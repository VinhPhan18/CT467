var app = angular.module("testApp",  ['bsTable']);
app.controller("userCtrl", function($scope,$http,$timeout) {
    $scope.Users=[];
    $scope.check=false;
    $scope.result=null;
    $scope.user={};
    $scope.edit=function(x){
        alert("Row index is: " +x);
    }
    
    $scope.getUsers=function(){
        $http.get("http://localhost/CT467_04UDW/Sources/admin/user/controller/getUsers.php?method=load_users").then(function (response) {
        $scope.Users = response.data.records;
        $scope.bsTableControl.options.data =  $scope.Users;
        $scope.bsTableControl.options.totalRows = $scope.Users.length; 
        console.log($scope.Users);
    });
    }
    $scope.getUsers(); 
    $scope.opencreateUser= function(){
        $scope.user={};
    }

    
    $scope.createUser= function(){
       
        var request = $http({
            method: "POST",
            url: "http://localhost/CT467_04UDW/Sources/admin/user/controller/postUser.php?method=post_user",
            data: {
                user: $scope.user
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        
        /* Check whether the HTTP Request is successful or not. */
            request.then(function (response) {
                $scope.result=response.data;
                $scope.getUsers();
                $scope.user={};
                $timeout($scope.autoHide, 5000);
                
        });

    }

    $scope.editUser=function(){
    }
    $scope.saveUser =function(){
        var request = $http({
            method: "PUT",
            url: "http://localhost/CT467_04UDW/Sources/admin/user/controller/updateUser.php?method=put_User",
            data: {
                user: $scope.user,
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        
        /* Check whether the HTTP Request is successful or not. */
            request.then(function (response) {
                $scope.getUsers();
                $scope.result=response.data;
                $timeout($scope.autoHide, 5000);
        });
    }

    $scope.confirmDeleteUser=function(){
        var r = confirm("X??c nh???n x??a");
        if (r == true) {
           $scope.deleteUser();
        } else {
           
        }
    }
    $scope.deleteUser= function(){
        var request = $http({
            method: "POST",
            url: "http://localhost/CT467_04UDW/Sources/admin/user/controller/deleteUser.php?method=del_user",
            data: {
                userID: $scope.user.ID_User
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        
        /* Check whether the HTTP Request is successful or not. */
            request.then(function (response) {
                $scope.result=response.data;
                $scope.getUsers();
                $scope.user={};
                $timeout($scope.autoHide, 5000);
        });
    }

    $scope.autoHide= function(){
        $scope.result=null;
    }
    var isstatusFormatter = function (value) {
        if (value==1) {
            return '??ang ho???t ?????ng';
        }
        else {
            return 'Ch??a ho???t ?????ng';
        
        }
    };
    $scope.bsTableControl = {
        options: {
            data: $scope.Users,
            idField: 'id',
            sortable: true,
            striped: true,
            search:true,
            maintainSelected: true,
            clickToSelect: true,
            showColumns: false,
            singleSelect: true,
            showToggle: false,
            pagination: true,
            pageSize: 10,
            pageList: [5, 10, 25, 50, 100],
            onCheck: function (row, $element) {
                $scope.$apply(function () {
                    $scope.check=true;
                    $scope.user=row;
                    console.log($scope.check);
                });
            },
            onUncheck: function (row, $element) {
                $scope.check=false;
               $scope.user={};
               console.log($scope.check);
            },
            columns: [{
                field: 'state',
                checkbox: true
            },
             {
                field: 'firstname',
                title: 'H???',
                align: 'center',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'lastname',
                title: 'T??n',
                align: 'center',
                valign: 'bottom',
                sortable: true
            }, {
                field: 'email',
                title: 'Email',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'address',
                title: '?????a ch???',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'contact_number',
                title: 'S??? ??i???n tho???i',
                align: 'center',
                valign: 'middle'
            },{
                field: 'access_level',
                title: 'Ph??n quy???n',
                align: 'center',
                valign: 'middle'
            }
            ,{
                field: 'status',
                title: 'Tr???ng th??i',
                align: 'center',
                valign: 'middle',
                sortable: true,
                formatter:isstatusFormatter
            }]
        }
    };

});