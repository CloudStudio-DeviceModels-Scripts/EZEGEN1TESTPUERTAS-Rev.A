function parseUplink(device, payload)
{
    // Obtener payload como JSON
    const jsonPayload = payload.asJsonObject();
    Object.keys(jsonPayload).forEach(function(key){
        env.log(key,jsonPayload[key])
    })

    // No se puede deserializar el payload como json, salir.
    if (!jsonPayload) { return; }

    // Procesar JSON de EZE GEN1 (hasta 200 registros por sensor por call)
    
    if (jsonPayload.data !== null) {
        var camaraA = device.endpoints.byAddress(1);
        var hornoA = device.endpoints.byAddress(2);
        var hornoB = device.endpoints.byAddress(3);
        var camaraD = device.endpoints.byAddress(9);
        var puertasCamA = device.endpoints.byAddress(11);
        


        
        // Sentencia para Payload de Camara de  frio A Input 1
        if (jsonPayload.inp == "Camara de Frio A")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    camaraA.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }




        // Sentencia para Payload de Horno A input 2
        if (jsonPayload.inp == "Horno A")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    hornoA.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }




        // Sentencia para Payload de Horno B input 3
        if (jsonPayload.inp == "Horno B t")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    hornoB.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }



        // Sentencia para Payload Camara D
        if (jsonPayload.inp == "Camara de Frio D")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("TEMP --> ",item.val);
                    camaraD.updateTemperatureSensorStatus(item.val,item.time);
                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }






        // Sentencia para Payload Puerta Camara A
        /*
        2800:  AMBAS CERRADAS -----> 1
        3900:  EXTERIOR ABIERTA ---> 2
        5000:  INTERIOR ABIERTA ---> 1
        10000: AMBAS ABIERTAS -----> 2
        */

        if (jsonPayload.inp == "Puertas camara Frio A")
        {
            const data = jsonPayload.data;
            var ultimo = "";
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    env.log("FECHA --> ",item.time);
                    env.log("Puerta --> ",item.val);

                    if(item.val <= 2800 && item.val >=1000 )
                    puertasCamA.updateIASSensorStatus(1,item.time);
                    if(item.val > 2800 && item.val <=10000 )
                    puertasCamA.updateIASSensorStatus(2,item.time);
                    if(item.val < 1000 || item.val >10000 )
                    puertasCamA.updateIASSensorStatus(7,item.time);

                    // DDM: agrego este "if" por si los datos vinieran desordenados
                    if (item.time > ultimo)
                    ultimo = item.time;
                    }
                env.log("Ultimo --> ", ultimo);

        // Resultado del método HTTP. Devolvemos un json con un campo "result", que
        // contiene el "time" más alto recibido, como se indica en la documentación.
        var httpResponse = new HttpResponse();
        httpResponse.statusCode = 200;
        httpResponse.contentType = "application/json";
        httpResponse.content.setAsJson({ result: ultimo });
        return httpResponse;
        }







    }
    if (jsonPayload.pid != undefined && jsonPayload.pid != null) {
        var pid2 = jsonPayload.pid;
        if (pid2 == "SALA ENVASADO"){
            env.log("pid OK --> ",pid2);
        }
        else{
            env.log("pid FALSE --> ",pid2);
        }


    }



    // Importante: si el script llega a este punto es que no se pudo parsear el json.
    // Como no estamos devolviendo nada, el motor de scripting devolverá el valor por
    // defecto, que consiste en:
    // - Status code 200
    // - Content type "text/plain"
    // - Body vacío (sin contenido)
}