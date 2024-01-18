class Camera{
    constructor(videoNode){
        this.videoNode = videoNode;
        this.stream = null;
        this.photo= null;
        console.log("Creamos new Camera")
    }

    on(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            this.off();
            return navigator.mediaDevices.getUserMedia({
                audio:false,
                video:{
                    width:300,
                    height:300,
                    facingMode:'user'
                }
            }).then(stream=>{
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true;
            }).catch(error=>{
                alert("OOps!! ocurrio un error al abrir la camara");
                console.log(error);
                return false;
            });
        }else{
            alert("No cuentas con dispositivos multimedia");
            return false;
        }
    }

    onBack(){
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia()){
            this.off();
            return navigator.mediaDevices.getUserMedia({
                audio:false,
                video:{
                    width:300,
                    height:300,
                    facingMode:{
                        exact:'environment'
                    }
                }
            }).then(stream=>{
                this.videoNode.srcObject = stream;
                this.stream = stream;
                return true;
            }).catch(error=>{
                alert("OOps!! ocurrio un error al abrir la camera");
                console.log(error);
                return false;
            });
        }else{
            alert("no cuentas con dispositivos multimedia");
            return false;
        }
    }

    off(){
        if(this.videoNode){
            this.videoNode.pause();
            if(this.stream){
                this.stream.getTracks().forEach(track =>{
                    track.stop();
                });
            }
        }
    }

    takePhoto(){
        let canvas = document.createElement('canvas');
        canvas.setAttribute('width',300);
        canvas.setAttribute('height',300);
        let context = canvas.getContext('2d');
        context.drawImage(this.videoNode,0,0,canvas.width,canvas.height);
        this.photo = context.canvas.toDataURL();
        canvas = null;
        context = null;
        this.videoNode.removeAttribute('src');
        this.videoNode.load();
        return this.photo;
    }
}