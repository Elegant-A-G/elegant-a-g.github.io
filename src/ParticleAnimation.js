import React from "react";

import * as THREE from "three";
import {Float32BufferAttribute} from "three";

const circleVert = `
in vec3 offset;
uniform float time;
${THREE.ShaderChunk.common}
${THREE.ShaderChunk.fog_pars_vertex}
void main() {
    ${THREE.ShaderChunk.begin_vertex}
    ${THREE.ShaderChunk.project_vertex}
    float xPos = position.x;
    float zPos = position.z;
    float yPos = (sin((offset.x + time) * 0.3) * 50.0) + (sin((offset.z + time) * 0.5) * 50.0);
   
    vec4 modelViewPosition = modelViewMatrix * vec4(xPos, yPos, zPos, 1.0);
    gl_Position = projectionMatrix * modelViewPosition;  
    float size = (sin((xPos + time) * 0.3) + 1.0) * 2.0 + (sin((zPos + time) * 0.5) + 1.0) * 2.0;
    gl_PointSize = size * (500.0 / length(modelViewPosition.xyz)); 
   
    ${THREE.ShaderChunk.fog_vertex}
}
`;

const circleFrag = `
uniform vec3 color;
uniform float time;
uniform float elapsedTime;
${THREE.ShaderChunk.common}
${THREE.ShaderChunk.fog_pars_fragment}
vec3 rainbow() {
    vec4 outCol = mod(vec4(1, 2, 3, 0) - 3.0 * (elapsedTime / 15.0), 3.0);
    outCol = min(outCol, 2.0 - outCol);
    
    return outCol.xyz;
}
void main() {
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float radius = length(xy);
    
    gl_FragColor = vec4(1, 0.686, 0.1137, step(radius, 0.5));
    
    ${THREE.ShaderChunk.fog_fragment}
}
`;

function createParticles() {
    const particleAmt = 100;
    const particleSpacing = 100;

    let shaderMaterial = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        lights: true,
        fog: true,
        uniforms: {
            ...THREE.UniformsUtils.merge([THREE.UniformsLib.lights, THREE.UniformsLib.fog]),
            color: {value: new THREE.Color(0x015050)},
            time: {value: 1},
            elapsedTime: {value: 1}
        },

        vertexShader: circleVert,
        fragmentShader: circleFrag
    });

    let points = [];
    let offsets = [];

    for (let x = 0; x < 100; x++) {
        for (let z = 0; z < 100; z++) {
            let px = x * particleSpacing - ((particleSpacing * particleAmt) / 2);
            let pz = z * particleSpacing - ((particleSpacing * particleAmt) / 2);
            points.push(px, 0, pz);
            offsets.push(x, 0, z);
        }
    }

    let dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute('position', new Float32BufferAttribute(points, 3));
    dotGeometry.setAttribute('offset', new Float32BufferAttribute(offsets, 3));

    return {
        points: new THREE.Points(dotGeometry, shaderMaterial),
        shader: shaderMaterial
    };
}

/**
 * @param className : String
 */
class ParticleAnimation extends React.Component {

    state = {
        scene: null,
        camera: null,
        renderer: null,
        count: 0
    };

    calcCanvasSize = () => ({
        width: window.innerWidth * this.props.innerWidth,
        height: window.innerHeight * this.props.innerHeight
    });

    calcAspectRatio = () => {
        const size = this.calcCanvasSize();
        return size.width / size.height;
    };

    windowResizedEvent = () => {
        const {camera, renderer} = this.state;
        const size = this.calcCanvasSize();

        if (camera) {
            camera.aspect = size.width / size.height;
            camera.updateProjectionMatrix();
        }

        if (renderer)
            renderer.setSize(size.width, size.height);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizedEvent);
    }

    componentDidMount() {
        window.addEventListener('resize', this.windowResizedEvent);

        const renderSettings = {
            antialias: true,
            alpha: true,
            depth: true,
            precision: 'mediump',
            failIfMajorPerformanceCaveat: true
        };

        const aspectRatio = this.calcAspectRatio();
        this.setState({
            scene: new THREE.Scene(),
            camera: new THREE.PerspectiveCamera(120, aspectRatio, 1, 10000),
            renderer: new THREE.WebGLRenderer(renderSettings)
        }, () => {
            const size = this.calcCanvasSize();
            const {scene, camera, renderer} = this.state;
            const {points, shader} = createParticles();

            scene.fog = new THREE.Fog(0x24282F, 1, 5000);
            renderer.setSize(size.width, size.height);

            if (this.threeMount && !this.threeMount.firstChild) {
                this.threeMount.appendChild(renderer.domElement);

                camera.position.set(366, 300, 0);
                camera.rotation.set(-1.570, 1.08, 1.570);
                camera.lookAt(scene.position);

                points.rotateY(0.5)
                scene.add(points);

                const timer = new THREE.Clock();
                const renderThreeJS = () => {
                    requestAnimationFrame(renderThreeJS);
                    const {count} = this.state;
                    shader.uniforms.time.value = count;
                    shader.uniforms.elapsedTime.value = timer.getElapsedTime();
                    renderer.render(scene, camera);
                    this.setState({count: count + 0.06});
                }

                renderThreeJS();
            }
        });
    }

    render() {
        return <div className={this.props.className} ref={ref => this.threeMount = ref} />
    }
}

export default ParticleAnimation;
