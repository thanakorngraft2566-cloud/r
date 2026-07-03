window.CameraShake = {

    basePos: new THREE.Vector3(),

    init(camera) {
        this.basePos.copy(camera.position);
    },

    update(camera, analyzer, dataArray) {

        if (!analyzer || !dataArray) return;

        analyzer.getByteFrequencyData(dataArray);

        let bass = 0;

        for (let i = 0; i < 4; i++)
            bass += dataArray[i];

        bass /= 4;

        const p = Math.max(0, (bass - 70) / 180);

        camera.position.copy(this.basePos);

        camera.position.y += (Math.random() - 0.5) * p * 0.9;

        camera.rotation.z = (Math.random() - 0.5) * p * 0.02;
    }

};