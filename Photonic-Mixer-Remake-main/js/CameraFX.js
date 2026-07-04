window.CameraFX = {

    power: 0,
    baseFov: 45,

    init(camera) {

        this.baseFov = camera.fov;

    },

    update(camera, analyzer, dataArray) {

        if (!analyzer || !dataArray) return;

        analyzer.getByteFrequencyData(dataArray);

        let bass = 0;

        for (let i = 0; i < 6; i++)
            bass += dataArray[i];

        bass /= 6;

        // Impact
        if (bass > 170)
            this.power += (bass - 170) * 0.04;

        // Smooth
        this.power *= 0.88;

        // Zoom Punch
        camera.fov = this.baseFov + Math.min(this.power, 4);

        // Rotation Impact
        camera.rotation.z =
            (Math.random() - 0.5) * this.power * 0.003;

        camera.updateProjectionMatrix();

    }

};