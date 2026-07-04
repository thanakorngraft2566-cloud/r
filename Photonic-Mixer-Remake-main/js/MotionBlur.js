window.MotionBlur = {

    power: 0,

    init(renderer) {

        this.canvas = renderer.domElement;

        this.canvas.style.transformOrigin = "center center";
        this.canvas.style.willChange = "transform, filter";
        this.canvas.style.transition = "filter 0.03s linear";

    },

    update(analyzer, dataArray) {

        if (!analyzer || !dataArray) return;

        analyzer.getByteFrequencyData(dataArray);

        // ===== BASS =====
        let bass = 0;
        let weight = 0;

        for (let i = 0; i < 10; i++) {

            const w = Math.pow(0.82, i);

            bass += dataArray[i] * w;
            weight += w;

        }

        bass /= weight;

        // ===== IMPACT =====
        if (bass > 170) {

            this.power += (bass - 170) * 0.12;

        }

        // ===== SMOOTH =====
        this.power *= 0.83;

        if (this.power < 0.02) {

            this.power = 0;

            this.canvas.style.filter = "";
            this.canvas.style.transform = "";

            return;

        }

        // ===== EFFECT =====

        const blur = THREE.MathUtils.clamp(this.power * 0.08, 0, 3);

        const zoom = 1 - THREE.MathUtils.clamp(this.power * 0.004, 0, 0.04);

        const bright = 1 + THREE.MathUtils.clamp(this.power * 0.003, 0, 0.08);

        this.canvas.style.transform =
            `scale(${zoom})`;

        this.canvas.style.filter =
            `blur(${blur}px) brightness(${bright}) contrast(1.05)`;

    }

};