import * as UE from 'ue'
import TS_BaseGun from './Base/TS_BaseGun';
import {$ref, $unref} from 'puerts' //和本节无关，但后面要用到
import './Base/ObjectExt'



function delay(t:number) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, t);
    });
}

class TS_Player extends UE.Character{
    FpsCamera:UE.CameraComponent;
    EquippedGun:TS_BaseGun;
    GunLocation:UE.SceneComponent;

    CanShoot:boolean;


    Constructor(){
        let FpsCamera = this.CreateDefaultSubobjectGeneric<UE.CameraComponent>("FpsCamera",UE.CameraComponent.StaticClass());
        FpsCamera.SetupAttachment(this.CapsuleComponent,"FpsCamera");
        FpsCamera.K2_SetRelativeLocationAndRotation(new UE.Vector(0,0,90),undefined,false,$ref<UE.HitResult>(undefined),false);
        FpsCamera.bUsePawnControlRotation = true;
        this.FpsCamera = FpsCamera;

        this.CanShoot = true;

        this.GunLocation = this.CreateDefaultSubobjectGeneric<UE.SceneComponent>('GunLocation',UE.SceneComponent.StaticClass());
        this.GunLocation .SetupAttachment(this.FpsCamera,"GunLocation");
        this.GunLocation.K2_SetRelativeLocationAndRotation(new UE.Vector(30, 14, -12), new UE.Rotator(0, 95, 0), false, $ref<UE.HitResult>(undefined), false);
    }

    ReceiveBeginPlay(): void {

        let ucls  = UE.Class.Load("/Game/Blueprints/TypeScript/TS_Rifle.TS_Rifle_C");
        this.EquippedGun = UE.GameplayStatics.BeginDeferredActorSpawnFromClass(this, ucls, undefined, UE.ESpawnActorCollisionHandlingMethod.Undefined, this) as TS_BaseGun;
        UE.GameplayStatics.FinishSpawningActor(this.EquippedGun, undefined);
        this.EquippedGun.K2_AttachToComponent(this.GunLocation, undefined, UE.EAttachmentRule.SnapToTarget, UE.EAttachmentRule.SnapToTarget, UE.EAttachmentRule.SnapToTarget, true);

    }



    //@no-blueprint
    async AShoot(axisValue:number):Promise<void>{
        if(axisValue == 1&&this.CanShoot){
            let cameraLocation = this.FpsCamera.K2_GetComponentLocation();
            let endLocation = cameraLocation.op_Addition(this.FpsCamera.GetForwardVector().op_Multiply(this.EquippedGun.MaxBulletDistance));
            this.EquippedGun.Shoot(cameraLocation,endLocation);
            this.CanShoot = false;

           await delay(this.EquippedGun.FireRate*1000);

            this.CanShoot = true;
        }
    }

    

    // 射击
    Shoot(axisValue:number):void{
        this.AShoot(axisValue);
   }
    //角色移动
    MoveForward(axisValue:number):void{
        this.AddMovementInput(this.GetActorForwardVector(),axisValue,false);
    }
    
    MoveRight(axisValue:number):void{
        this.AddMovementInput(this.GetActorRightVector(),axisValue,false);
    }
 
    LookHorizontal(axisValue:number) :void{
        this.AddControllerYawInput(axisValue);
    }
   
    LookVertical(axisValue:number) :void{
        this.AddControllerPitchInput(axisValue*-1);
    }
    Jump1():void{
        this.Jump();
    }
}
export default TS_Player;