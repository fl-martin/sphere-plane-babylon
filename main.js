const canvas = document.getElementById("renderCanvas"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
const frameRate = 60;

// Add your code here matching the playground format
const createScene = () => {
	const scene = new BABYLON.Scene(engine);
	scene.clearColor = BABYLON.Color3.White();

	/**** Set camera and light *****/
	const camera = new BABYLON.ArcRotateCamera(
		"camera",
		-Math.PI / 2,
		Math.PI / 2.5,
		10,
		new BABYLON.Vector3(0, 0, 0)
	);
	camera.attachControl(canvas, true);
	camera.wheelPrecision = 150;

	const betaAnimation = new BABYLON.Animation(
		"betaAnimation",
		"beta",
		frameRate,
		BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
	);
	const keyFrames = [];
	keyFrames.push({
		frame: 0,
		value: 1.532,
	});

	keyFrames.push({
		frame: 1100,
		value: 1.532,
	});
	keyFrames.push({
		frame: 1320,
		value: 1.632,
	});

	betaAnimation.setKeys(keyFrames);
	var easingFunction = new BABYLON.BezierCurveEase(0.44, 0.19, 0.49, 0.75);
	easingFunction.ease(0);
	betaAnimation.setEasingFunction(easingFunction);

	const alphaAnimation = new BABYLON.Animation(
		"alfaAnimation",
		"alpha",
		frameRate,
		BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
	);
	const keyFrames4 = [];
	keyFrames4.push({
		frame: 0,
		value: 1.603,
	});
	keyFrames4.push({
		frame: 1320,
		value: 5.224,
	});
	alphaAnimation.setKeys(keyFrames4);
	alphaAnimation.setEasingFunction(easingFunction);

	const radiusAnimation = new BABYLON.Animation(
		"radiusAnimation",
		"radius",
		frameRate,
		BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
	);
	const keyFrames2 = [];
	keyFrames2.push({
		frame: 0,
		value: 48.316,
	});
	keyFrames2.push({
		frame: 1100,
		value: 10.882,
	});
	keyFrames2.push({
		frame: 1320,
		value: 1.437,
	});
	radiusAnimation.setKeys(keyFrames2);
	radiusAnimation.setEasingFunction(easingFunction);

	const targetAnimation = new BABYLON.Animation(
		"targetAnimation",
		"target",
		frameRate,
		BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
		BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
	);
	const keyFrames3 = [];
	keyFrames3.push({
		frame: 0,
		value: new BABYLON.Vector3(0, 0, 0),
	});
	keyFrames3.push({
		frame: 660,
		value: new BABYLON.Vector3(0, 0, 0),
	});
	keyFrames3.push({
		frame: 1100,
		value: new BABYLON.Vector3(1, 0, 0),
	});
	keyFrames3.push({
		frame: 1320,
		value: new BABYLON.Vector3(5, 5.5, 0),
	});
	targetAnimation.setKeys(keyFrames3);
	targetAnimation.setEasingFunction(easingFunction);

	var animationGroup1 = new BABYLON.AnimationGroup("Group1");
	animationGroup1.addTargetedAnimation(targetAnimation, camera);
	animationGroup1.addTargetedAnimation(radiusAnimation, camera);
	animationGroup1.addTargetedAnimation(betaAnimation, camera);
	animationGroup1.addTargetedAnimation(alphaAnimation, camera);

	animationGroup1.play(true);

	const light = new BABYLON.HemisphericLight(
		"light",
		new BABYLON.Vector3(100, 80, -30)
	);
	light.diffuse = new BABYLON.Color3(1, 1, 1);
	light.specularColor = new BABYLON.Color3(0, 0, 0);
	light.groundColor = new BABYLON.Color3(0, 0, 0);

	const light2 = new BABYLON.HemisphericLight(
		"light2",
		new BABYLON.Vector3(10, 80, 120)
	);
	light2.diffuse = new BABYLON.Color3(1, 1, 1);
	light2.specularColor = new BABYLON.Color3(0, 0, 0);
	light2.groundColor = new BABYLON.Color3(0, 0, 0);

	buildTown(scene);
	scene.fogMode = BABYLON.Scene.FOGMODE_LINEAR;
	scene.fogColor = new BABYLON.Color3(1, 0, 0);
	scene.fogStart = 20.0;
	scene.fogEnd = 50.0;
	//scene.debugLayer.show();

	var defaultPipeline = new BABYLON.DefaultRenderingPipeline(
		"DefaultRenderingPipeline",
		true, // is HDR?
		scene,
		scene.cameras
	);
	if (defaultPipeline.isSupported) {
		/* imageProcessing */
		defaultPipeline.imageProcessingEnabled = true; //true by default
		if (defaultPipeline.imageProcessingEnabled) {
			defaultPipeline.imageProcessing.contrast = 1; // 1 by default
			defaultPipeline.imageProcessing.exposure = 1; // 1 by default
			/* color grading */
			defaultPipeline.imageProcessing.colorGradingEnabled = false; // false by default
			if (defaultPipeline.imageProcessing.colorGradingEnabled) {
				// using .3dl (best) :
				defaultPipeline.imageProcessing.colorGradingTexture =
					new BABYLON.ColorGradingTexture(
						"textures/LateSunset.3dl",
						scene
					);
				// using .png :
				/*
                var colorGradingTexture = new BABYLON.Texture("textures/colorGrade-highContrast.png", scene, true, false);
                colorGradingTexture.wrapU = BABYLON.Texture.CLAMP_ADDRESSMODE;
                colorGradingTexture.wrapV = BABYLON.Texture.CLAMP_ADDRESSMODE;                
                defaultPipeline.imageProcessing.colorGradingTexture = colorGradingTexture;
                defaultPipeline.imageProcessing.colorGradingWithGreenDepth = false;
                */
			}
			/* color curves */
			defaultPipeline.imageProcessing.colorCurvesEnabled = false; // false by default
			if (defaultPipeline.imageProcessing.colorCurvesEnabled) {
				var curve = new BABYLON.ColorCurves();
				curve.globalDensity = 0; // 0 by default
				curve.globalExposure = 0; // 0 by default
				curve.globalHue = 30; // 30 by default
				curve.globalSaturation = 0; // 0 by default
				curve.highlightsDensity = 0; // 0 by default
				curve.highlightsExposure = 0; // 0 by default
				curve.highlightsHue = 30; // 30 by default
				curve.highlightsSaturation = 0; // 0 by default
				curve.midtonesDensity = 0; // 0 by default
				curve.midtonesExposure = 0; // 0 by default
				curve.midtonesHue = 30; // 30 by default
				curve.midtonesSaturation = 0; // 0 by default
				curve.shadowsDensity = 0; // 0 by default
				curve.shadowsExposure = 0; // 0 by default
				curve.shadowsHue = 30; // 30 by default
				curve.shadowsDensity = 80;
				curve.shadowsSaturation = 0; // 0 by default;
				defaultPipeline.imageProcessing.colorCurves = curve;
			}
		}
		/* bloom */
		defaultPipeline.bloomEnabled = true; // false by default
		if (defaultPipeline.bloomEnabled) {
			defaultPipeline.bloomKernel = 35; // 64 by default
			defaultPipeline.bloomScale = 1; // 0.5 by default
			defaultPipeline.bloomThreshold = 0.1; // 0.9 by default
			defaultPipeline.bloomWeight = 0.9; // 0.15 by default
		}
		/* chromatic abberation */
		defaultPipeline.chromaticAberrationEnabled = false; // false by default
		if (defaultPipeline.chromaticAberrationEnabled) {
			defaultPipeline.chromaticAberration.aberrationAmount = 30; // 30 by default
			defaultPipeline.chromaticAberration.adaptScaleToCurrentViewport = false; // false by default
			defaultPipeline.chromaticAberration.alphaMode = 0; // 0 by default
			defaultPipeline.chromaticAberration.alwaysForcePOT = false; // false by default
			defaultPipeline.chromaticAberration.enablePixelPerfectMode = false; // false by default
			defaultPipeline.chromaticAberration.forceFullscreenViewport = true; // true by default
		}
		/* DOF */
		defaultPipeline.depthOfFieldEnabled = false; // false by default
		if (
			defaultPipeline.depthOfFieldEnabled &&
			defaultPipeline.depthOfField.isSupported
		) {
			defaultPipeline.depthOfFieldBlurLevel = 0; // 0 by default
			defaultPipeline.depthOfField.fStop = 1.4; // 1.4 by default
			defaultPipeline.depthOfField.focalLength = 50; // 50 by default, mm
			defaultPipeline.depthOfField.focusDistance = 2000; // 2000 by default, mm
			defaultPipeline.depthOfField.lensSize = 50; // 50 by default
		}
		/* FXAA */
		defaultPipeline.fxaaEnabled = false; // false by default
		if (defaultPipeline.fxaaEnabled) {
			defaultPipeline.fxaa.samples = 1; // 1 by default
			defaultPipeline.fxaa.adaptScaleToCurrentViewport = false; // false by default
		}
		/* glowLayer */
		defaultPipeline.glowLayerEnabled = false;
		if (defaultPipeline.glowLayerEnabled) {
			defaultPipeline.glowLayer.blurKernelSize = 16; // 16 by default
			defaultPipeline.glowLayer.intensity = 1; // 1 by default
		}
		/* grain */
		defaultPipeline.grainEnabled = true;
		if (defaultPipeline.grainEnabled) {
			defaultPipeline.grain.adaptScaleToCurrentViewport = true; // false by default
			defaultPipeline.grain.animated = true; // false by default
			defaultPipeline.grain.intensity = 5; // 30 by default
		}
		/* MSAA */
		defaultPipeline.samples = 4; // 1 by default
		/* sharpen */
		defaultPipeline.sharpenEnabled = false;
		if (defaultPipeline.sharpenEnabled) {
			defaultPipeline.sharpen.adaptScaleToCurrentViewport = false; // false by default
			defaultPipeline.sharpen.edgeAmount = 0.3; // 0.3 by default
			defaultPipeline.sharpen.colorAmount = 1; // 1 by default
		}
	}
	/*if (BABYLON.VideoRecorder.IsSupported(engine)) {
		var recorder = new BABYLON.VideoRecorder(engine);
		recorder.startRecording("test.webm", 23);
	}*/

	return scene;
};

const buildTown = (scene) => {
	const ground = buildGround(scene);
	//	const spheres = buildSpheres(scene);
};

/******Build Functions***********/
const buildGround = (scene) => {
	const sphere = BABYLON.Mesh.CreateSphere("sphere", 32, 3);

	const sphereMat = new BABYLON.StandardMaterial("sphereMat");
	sphereMat.diffuseTexture = new BABYLON.Texture("Images/texture-sphere.png");
	sphereMat.diffuseTexture.level = 0;
	sphereMat.bumpTexture = new BABYLON.Texture("Images/hydra1.png");
	sphereMat.bumpTexture.level = 2;
	sphere.material = sphereMat;

	const animSpheres = new BABYLON.Animation(
		"sphereAnimation",
		"rotation.y",
		frameRate,
		BABYLON.Animation.ANIMATIONTYPE_FLOAT,
		BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE
	);
	const spheresKeys = [];
	spheresKeys.push({ frame: 0, value: 0 });
	spheresKeys.push({ frame: frameRate * 500, value: 360 });
	animSpheres.setKeys(spheresKeys);
	sphere.animations.push(animSpheres);
	scene.beginAnimation(sphere, 0, frameRate * 500, true);

	var mirror = BABYLON.Mesh.CreateBox("Mirror", 1.0, scene);
	mirror.scaling = new BABYLON.Vector3(50.0, 0.01, 50.0);
	mirror.position = new BABYLON.Vector3(0, -2, 0);

	var bumpMaterial = new BABYLON.StandardMaterial("bump", scene);
	bumpMaterial.bumpTexture = new BABYLON.Texture(
		"Images/rombus-thin-normalMap.png"
	);
	bumpMaterial.bumpTexture.vScale = 10.0;
	bumpMaterial.bumpTexture.uScale = 10.0;
	bumpMaterial.bumpTexture.level = 2;
	bumpMaterial.reflectionTexture = new BABYLON.MirrorTexture(
		"mirror",
		1024,
		scene,
		true
	);
	bumpMaterial.reflectionTexture.mirrorPlane = new BABYLON.Plane(
		0,
		-1.0,
		0,
		-2.0
	);
	bumpMaterial.reflectionTexture.renderList = [sphere];
	bumpMaterial.reflectionTexture.level = 1.0;
	bumpMaterial.reflectionTexture.adaptiveBlurKernel = 8;
	bumpMaterial.reflectionTexture.level = 0.25;
	bumpMaterial.diffuseColor = new BABYLON.Color3(0.1, 0, 0.1);
	bumpMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
	bumpMaterial.specularColor = new BABYLON.Color3(1, 1, 1);
	bumpMaterial.specularPower = 128;

	mirror.material = bumpMaterial;
};

const scene = createScene(); //Call the createScene function

// Register a render loop to repeatedly render the scene
engine.runRenderLoop(function () {
	scene.render();
});

// Watch for browser/canvas resize events
//window.addEventListener("resize", function () {
//	engine.resize();
//});
