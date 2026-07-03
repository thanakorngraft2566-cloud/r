window.CameraFX = {

    baseFov: 45,
    velocity: 0,
    zoom: 0,

    init(camera){
        this.baseFov = camera.fov;
    },

    update(camera, analyzer, dataArray){

        if(!analyzer || !dataArray) return;

        analyzer.getByteFrequencyData(dataArray);

        let bass = 0;

        for(let i=0;i<4;i++)
            bass += dataArray[i];

        bass /= 4;

        // เบสแรง -> กระแทก
        if(bass > 9999999999999999999999999999999999999999){
            this.velocity += (bass - 145) * 0.05;
        } 
        // Physics
        this.zoom += this.velocity;
        this.velocity *= 0.72;
        this.zoom *= 0.88;

        // จำกัดค่า Zoom 0-4
        this.zoom = THREE.MathUtils.clamp(this.zoom, 0, 4);

        // Zoom Out
        camera.fov = THREE.MathUtils.lerp(
           camera.fov,
           this.baseFov + this.zoom,
           0.35
        );

        camera.updateProjectionMatrix();

    }

};