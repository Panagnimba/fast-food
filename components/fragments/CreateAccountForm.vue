<template>
    <div class="container wrapper flex flex-col justify-center">
        <form action="" id="form">
             <h2 class="text-center m-8">Connecter vous à votre compte</h2>
            <div class="item">
                <label for="email">E-mail</label>
                <input type="email" name="email" required>
            </div>
            <div class="item">
                <label for="password">Mot de passe</label>
                <div id="item2">
                    <input type="password" name="password" required>
                    <span class="bg-primary text-white">Montrer</span>
                </div>
            </div>
            <div class="text-center m-5 hover:text-red-600">
                <a href="">Mot de passe oublié ?</a>
            </div>
            <div class="text-center mb-5 ">
                <input type="submit" value="Connexion" class="bg-primary text-white">
            </div>
            <div class="text-center mb-5 hover:text-red-600">
                <a href="">Pas de compte ? Créez-en un</a>
            </div>
        </form>
    </div>
</template>
<style scoped>
    .wrapper{
        height: 60vh;
        padding: 15px;
        }
    #form
    {
        width: 100%;
        height: 40vh;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border: 1px solid rgb(236, 234, 234);
    }
    .item
    {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        margin: 8px 25px;
        width: 70%;
    }
    #item2 
    {
        width: 50%;
        display: flex;
        align-items: center;
    }
    #item2 input
    {
        width: 100%;
    }
    #item2 span
    {
        /* display: block; */
        display: flex;
        align-items: center;
        height: 45px;
        padding: 5px;
        cursor: context-menu;
    }
    input
    {
        width: 50%;
        height: 45px;
        outline: none;
        border: 1px solid rgb(236, 234, 234);
        padding: 5px;
    }
      input[type="submit"]
    {
        width: 200px;
        border-radius: 5px;
        padding: 10px;
    }
</style>