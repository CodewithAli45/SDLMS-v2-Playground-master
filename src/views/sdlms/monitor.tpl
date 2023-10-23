<section id="monitor">
<style>
td{
    
vertical-align: middle;

}
</style>
<table class="table">
        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Bio</th>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
        <!-- BEGIN profiles -->
            <tr>
                <td><img style="width:50px;height:50px" class="me-3" src="{profiles.data.picture}"> {profiles.data.name}</td>
                <td>{profiles.data.bio}</td>
                <td>
                    <a href="/profile/{profiles.uid}" class="mr-3" target="_blank">
                         <i style="font-size: 22px;" class="fa-user fas" aria-hidden="true"></i>
                    </a>
                    <a href="/widgets/comments?profileId={profiles._id}" class="mr-3" target="_blank">
                        <i style="font-size: 22px;" class=" fa-question-circle ms-2 fas" aria-hidden="true"></i>
                    </a>
                </td>
            </tr>
        <!-- END profiles -->
        </tbody>
    </table>

</section>