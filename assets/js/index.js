// var URL = '69.10.32.70';
// if(URL == null){
//     URL = 'sagyt.unab.edu.pe'
// }

$("#add_report").submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url" : `http://sagyt.unab.edu.pe/api/reports`,
        "method" : "POST",
        "data": data
    }

    $.ajax(request).done(function(response) {
              
        Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Los datos se han guardado exitosamente!',
        showConfirmButton: false,
        timer: 1500
        })

        // if(window.location.pathname=="/view-person"){
        //     document.getElementById("newapp").innerHTML = "Registro efectuado";
        // }

    })
    

    
})

$("#add_person").submit(function(event){
    Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Los datos se han guardado exitosamente!',
        showConfirmButton: false,
        timer: 1500
        })
})

$("#add_approval").submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url" : `http://sagyt.unab.edu.pe/api/approvals`,
        "method" : "POST",
        "data": data
    }

    $.ajax(request).done(function(response) {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Los datos se han guardado exitosamente!',
            showConfirmButton: false,
            timer: 1500
            })
    })
})

$("#update_approval").submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url" : `http://sagyt.unab.edu.pe/api/approvals/${data.id}`,
        "method" : "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Los datos se han actualizado exitosamente!',
            showConfirmButton: false,
            timer: 1500
            })
    })
})

$("#update_report").submit(function(event){
    event.preventDefault();

    var unindexed_array=$(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url" : `http://sagyt.unab.edu.pe/api/reports/${data.id}`,
        "method" : "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Los datos se han actualizado exitosamente!',
            showConfirmButton: false,
            timer: 1500
            })
    })
})

$("#update_person").submit(function(event){
    event.preventDefault();
    
    var unindexed_array=$(this).serializeArray();
    console.log(unindexed_array);
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url" : `http://sagyt.unab.edu.pe/api/persons/${data.id}`,
        "method" : "PUT",
        "data": data
    }

    $.ajax(request).done(function(response) {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Los datos se han actualizado exitosamente!',
            showConfirmButton: false,
            timer: 1500
            })
    })
})

$('#prueba a.delete').click(function(event){
    event.preventDefault();

    var id = $(this).attr("data-id")

    var request = {
        "url" : `http://sagyt.unab.edu.pe/api/persons/${id}`,
        "method" : "DELETE",
    }

    Swal.fire({
        title: '??Est??s seguro de eliminar el registro?',
        text: "No podr??s revertir los cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ELIMINAR'
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax(request).done(function(response){
            Swal.fire({
                title: 'Eliminado!',
                text: 'El registro ha sido eliminado.',
                icon: 'success',
                showConfirmButton: false
            }
                
            )    
            setTimeout('location.reload()',1600)
            //   window.history.back()
          })
          
        }

        
        
    })
})



//graduate-person
if(window.location.pathname=="/view-person"){
    $ondelete = $(".cinta a.upgrad"); //specify button location 
    $ondelete.click(function () {
        var id = $(this).attr("data-id") //attribute defined in file _show.ejs

        var request = {
            "url" : `http://sagyt.unab.edu.pe/api/reports/assignperson/${id}`,
            "method" : "PUT",
            "data": data
        }

        if(confirm("?? Deseas crear un registro de esta persona ?")){
            $.ajax(request).done(function(response) {
                // alert("Los datos han sido eliminados exitosamente!")
                // location.reload()
            })
        }
    })
}

//approval-person
if(window.location.pathname=="/view-person"){
    $ondelete = $(".d-gridmain a.upapproval"); //specify button location 
    $ondelete.click(function () {
        var id = $(this).attr("data-id") //attribute defined in file _show.ejs

        var request = {
            "url" : `http://sagyt.unab.edu.pe/api/approvals/assignperson/${id}`,
            "method" : "PUT",
            "data": data
        }

        if(confirm("?? Deseas crear un registro de esta persona ?")){
            $.ajax(request).done(function(response) {
                // alert("Los datos han sido eliminados exitosamente!")
                // location.reload()
            })
        }
    })
}

//delete person
// if(window.location.pathname=="/index"){
//     $ondelete = $(".table tbody td a.delete"); //specify button location 
//     $ondelete.click(function () {
//         var id = $(this).attr("data-id") //attribute defined in file _show.ejs

//         var request = {
//             "url" : `http://sagyt.unab.edu.pe/api/persons/${id}`,
//             "method" : "DELETE",
//         }

//         // if(confirm("?? Est??s seguro de eliminar este registro ?")){
//         //     $.ajax(request).done(function(response) {
//         //         alert("Los datos han sido eliminados exitosamente!")
//         //         location.reload()
//         //     })
//         // }

        

        
        
        


//     })
// }

//delete graduate
if(window.location.pathname=="/view-graduate"){
    $ondelete = $(".cinta a.delgrad"); //specify button location 
    $ondelete.click(function () {
        var id = $(this).attr("data-id") //attribute defined in file _show.ejs

        var request = {
            "url" : `http://sagyt.unab.edu.pe/api/reports/${id}`,
            "method" : "DELETE",
        }

        // if(confirm("?? Est??s seguro de eliminar este registro ?")){
        //     $.ajax(request).done(function(response) {
        //         alert("Los datos han sido eliminados exitosamente!")
        //         // location.reload()
        //         window.history.back()
        //     })
        // }

        Swal.fire({
            title: '??Est??s seguro de eliminar el registro?',
            text: "No podr??s revertir los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ELIMINAR'
          }).then((result) => {
            if (result.isConfirmed) {
              $.ajax(request).done(function(response){
                Swal.fire(
                    'Eliminado!',
                    'El registro ha sido eliminado.',
                    'success'
                  )    
                setTimeout('window.history.back()',1800)
                //   window.history.back()
              })
              
            }

            
            
        })
    })
}

//delete approval
if(window.location.pathname=="/view-approval"){
    $ondelete = $(".cinta a.delapp"); //specify button location 
    $ondelete.click(function () {
        var id = $(this).attr("data-id") //attribute defined in file _show.ejs

        var request = {
            "url" : `http://sagyt.unab.edu.pe/api/approvals/${id}`,
            "method" : "DELETE",
        }

        // if(confirm("?? Est??s seguro de eliminar este registro ?")){
        //     $.ajax(request).done(function(response) {
        //         alert("Los datos han sido eliminados exitosamente!")
        //         // location.reload()
        //         window.history.back()
        //     })
        // }

        Swal.fire({
            title: '??Est??s seguro de eliminar el registro?',
            text: "No podr??s revertir los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ELIMINAR'
          }).then((result) => {
            if (result.isConfirmed) {
              $.ajax(request).done(function(response){
                Swal.fire(
                    'Eliminado!',
                    'El registro ha sido eliminado.',
                    'success'
                  )    
                setTimeout('window.history.back()',1800)
                //   window.history.back()
              })
              
            }

            
            
        })
        
    })
    
}

// //Prueba de evento
// if(window.location.pathname=="/add-report"){
//     $save = $(".form .save button.crgrad"); //specify button location 
//     $save.click(function () {
//         document.getElementsByClassName("upgrad").innerHTML = "Registro efectuado";
        
//     })
// }



